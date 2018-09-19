import axios from 'axios';
const isDev = process.env.deploy === undefined;

export default axios.create({
  baseURL: isDev ? 'http://127.0.0.1:4000' : 'http://workos.top:4000',
  timeout: 1000,
});
