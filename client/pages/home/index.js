import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import * as actions from '../../lib/actions';

class Home extends React.PureComponent {
  changeNum = () => {
    this.props.changeNum(this.props.num + 1);
  };
  goback = () => {
    Router.back();
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <div>I's home, load redux: {this.props.num}</div>
        <button onClick={this.changeNum}>add num</button>
        <a style={{ color: '#33f' }} onClick={this.goback}>
          go to index page
        </a>
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
