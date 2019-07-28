/* tslint:disable no-var-requires */
/* tslint:disable no-console */

import * as React from 'react'
import Helmet from 'react-helmet'

const config = require('../gatsby-config.js')

interface HtmlProps {
  body: any
  postBodyComponents: any
  headComponents: any
}

export default (props: HtmlProps) => {
  const head = Helmet.rewind()

  return (
    <html lang="en">
      <head>
        {props.headComponents}
        <title>My website</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
      </head>
      <body>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
