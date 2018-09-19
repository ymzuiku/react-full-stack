export function changeNum(num) {
  return {
    type: 'add',
    reducer: state => {
      return state.setIn(['test', 'num'], num);
    },
  };
}
