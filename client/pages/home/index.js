import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import * as actions from '../../lib/actions';

class Home extends React.PureComponent {
  changeNum = () => {
    this.props.changeNum(this.props.num + 1);
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <div>I's home, load redux: {this.props.num}</div>
        <button onClick={this.changeNum}>add num</button>
        <Link href="/index">
          <a>go to index page</a>
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
)(Home);
