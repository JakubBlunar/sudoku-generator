import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { Helmet, HelmetData } from 'react-helmet'

export default class MyDocument extends Document<{ helmet: HelmetData }> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
        helmet: Helmet.renderStatic()
      }
    } finally {
      sheet.seal()
    }
  }

  getHelmetData() {
    return {
      head: Object.keys(this.props.helmet)
        .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
        // @ts-ignore
        .map(el => this.props.helmet[el].toComponent()),
      body: this.props.helmet.bodyAttributes.toComponent(),
      html: this.props.helmet.htmlAttributes.toComponent()
    }
  }

  render() {
    const { body, head, html } = this.getHelmetData()

    return (
      <Html lang="en" {...html}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Teko|Noto+Sans|Source+Sans+Pro:300,400,600"
            rel="stylesheet"
            type="text/css"
          />
          {head}
        </Head>
        <body {...body}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
