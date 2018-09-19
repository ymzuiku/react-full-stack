# Isomorphic: Next.js and Koa Server Separate

## Install

copy this code to Terminal, and change `<your-project>` string

```sh
react-full-stack(){
  git clone -b master --single-branch https://github.com/ymzuiku/react-full-stack.git $1
  cd $1 && yarn install
}
react-full-stack your-project
```

## Run

** Open MySQL server in localhost:3306 **
** Set MySQL password in server.js **

This project use pm2:

```$
$ npm install -g pm2
```

Run Client and Server

```
$ yarn start
```

Wait done, open http://127.0.0.1:4001 in browser


Stop Client and Server

```sh
$ yarn stop
```

## License

```
MIT License

Copyright (c) 2013-present, Facebook, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
