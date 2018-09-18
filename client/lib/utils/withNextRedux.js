import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Map, fromJS } from 'immutable';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__FULL_STACK_STORE__';

function singleReducer(state = Map({}), action) {
  if (action.reducer) {
    return action.reducer(state) || state;
  }
  return state;
}

function initializeStore(initialState = Map({})) {
  return createStore(
    singleReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (initialState && typeof initialState.setIn === 'undefined') {
    initialState = fromJS(initialState);
  }
  if (isServer) {
    return initializeStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

const withNextRedux = App => {
  return class AppWithRedux extends React.PureComponent {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore();

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState().toJS(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};

const storage = {
  localName: 'defaultIOKey',
  save: (v, theKey = storage.localName) => {
    if (isServer) return;
    const theType = Object.prototype.toString.call(v);
    if (theType === '[object Object]') {
      localStorage.setItem(theKey, JSON.stringify(v));
    } else if (theType === '[object String]') {
      localStorage.setItem(theKey, v);
    } else {
      console.warn('Warn: storage.save() param is no a Object');
    }
  },
  load: (theKey = storage.localName) => {
    if (isServer) return;
    try {
      const data = localStorage.getItem(theKey);
      if (data) {
        if (typeof data === 'string') {
          return JSON.parse(data);
        }
        return data;
      }
    } catch (err) {
      console.warn('load last localSate error');
    }
  },
  clear: (theKey = storage.localName) => {
    if (isServer) return;
    localStorage.setItem(theKey, {});
  },
};

const autoStorageSave = (store, localName, needSaveKeys) => {
  if (isServer) return;
  if (localName) {
    storage.localName = localName;
  }
  if (Object.prototype.toString.call(needSaveKeys) !== '[object Array]') {
    // eslint-disable-next-line
    console.warn('autoSaveStorageKeys: params is no a Array');
  }
  // only needSaveKeys emit IO, save to localStorage
  const lastDatas = {};
  needSaveKeys.forEach(v => {
    lastDatas[v] = undefined;
  });
  store.subscribe(() => {
    const state = store.getState();
    const nowDatas = {};
    let isNeedSave = false;
    needSaveKeys.forEach(v => {
      // listen Store use Immutable fix no change
      if (Object.prototype.toString.call(v) === '[object Array]') {
        nowDatas[v] = state.getIn(v);
      }
      nowDatas[v] = state.get(v);
      if (lastDatas[v] !== nowDatas[v]) {
        isNeedSave = true;
      }
    });
    if (isNeedSave) {
      storage.save(nowDatas);
      needSaveKeys.forEach(v => {
        lastDatas[v] = nowDatas[v];
      });
    }
  });
  //首次读取
  const lastLocalData = storage.load(storage.localName);
  if (Object.prototype.toString.call(lastLocalData) === '[object Object]') {
    store.dispatch({
      type: 'localStorageLoad: IO',
      reducer: state => {
        return fromJS({
          ...state.toJS(),
          ...lastLocalData,
        });
      },
    });
  }
};

export { storage, initializeStore, autoStorageSave, withNextRedux };
