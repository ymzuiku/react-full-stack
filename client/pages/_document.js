import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="renderer" content="webkit" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="full-screen" content="true" />
          <meta name="x5-fullscreen" content="true" />
          <meta name="360-fullscreen" content="true" />
          <meta name="laya" screenorientation="landscape" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta httpEquiv="expires" content="0" />
          <meta httpEquiv="Cache-Control" content="no-siteapp" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />
          <title>full-stack</title>
          <style>{`
            html {
              margin: 0px;
              padding: 0px;
            }

            body {
              margin: 0px;
              padding: 0px;
              height: 100vh;
              width: 100vw;
              overflow: hidden;
            }
        
            * {
              -webkit-user-select: none;
              -webkit-appearance: none;
              -webkit-overflow-scrolling: touch;
            }
        
            *,
            *:before,
            *:after {
              -webkit-tap-highlight-color: transparent;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              -ms-box-sizing: border-box;
              box-sizing: border-box;
            }
        
            input,
            button {
              outline: none;
              border: none;
            }
        
            #root {
              display: flex;
              height: 100%;
              width: 100%;
            }
          `}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
