import App, { Container } from 'next/app';
import React from 'react';
import { withNextRedux, autoStorageSave } from '../utils/withNextRedux';
import { Provider } from 'react-redux';
import '../css/main.scss';

class MyApp extends App {
  constructor(props) {
    super(props);
    autoStorageSave(this.props.reduxStore, 'next-data', ['test']);
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withNextRedux(MyApp);
