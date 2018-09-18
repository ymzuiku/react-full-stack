import React from 'react';
import selfAxios from '../utils/selfAxios';

const isDev = process.env.deploy === undefined;

export default class extends React.PureComponent {
  static async getInitialProps() {
    const res = await selfAxios.get('/nojwt/test');
    const post = await selfAxios.post('/api/nojwt/user/login', {
      username: 'test-' + Date.now(),
      password: '123',
      msg: 'the-next',
    });
    return { res: res.data, post: post.data, isDev };
  }
  render() {
    console.log(this.props);
    return <div>Welcome to next</div>;
  }
}
