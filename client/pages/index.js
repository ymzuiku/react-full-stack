import React from 'react';
import { connect } from 'react-redux';
import selfAxios from '../lib/utils/selfAxios';
import * as actions from '../lib/actions';

const isDev = process.env.deploy === undefined;

class Index extends React.PureComponent {
  static async getInitialProps() {
    const res = await selfAxios.get('/nojwt/test');
    const post = await selfAxios.post('/api/nojwt/user/login', {
      username: 'test-' + Date.now(),
      password: '123',
      msg: 'the-next',
    });
    return { res: res.data, post: post.data, isDev };
  }
  changeNum = () => {
    this.props.changeNum(this.props.num + 1);
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <div>Welcome to next {this.props.num}</div>
        <button onClick={this.changeNum}>add num</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    num: state.getIn(['test', 'num']) || 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNum: v => {
      dispatch(actions.changeNum(v));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
