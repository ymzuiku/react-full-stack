import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import selfAxios from '../utils/selfAxios';
import * as actions from '../actions';
import css from '../css/layout.scss';

const isDev = process.env.deploy === undefined;

class Index extends React.PureComponent {
  static async getInitialProps() {
    try {
      var res = await selfAxios.get('/nojwt/test');
      var user = await selfAxios.post('/api/nojwt/user/login', {
        username: 'test-' + Date.now(),
        password: '123',
        msg: 'the-next',
      });
    } catch (error) {}
    return { res: res && res.data, post: user && user.data, isDev };
  }
  changeNum = () => {
    this.props.changeNum(this.props.num + 1);
  };
  render() {
    console.log(this.props);
    return (
      <div className={css.test}>
        <div>Welcome to next {this.props.num}</div>
        <button onClick={this.changeNum}>add num</button>
        <Link href="/home">
          <a>go to home page</a>
        </Link>
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
