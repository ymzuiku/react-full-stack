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
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
