import express from 'express'
import React from 'react'
import DOM from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import browserify from 'browserify-middleware'
import babelify from 'babelify'
import routes from './routes'
import configureStore from './configure-store'

const app = new express()

function renderPage (options) {
  const { title, markup, intialState } = options
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
    </head>
    <body>
      <div id="main">${markup}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(intialState || {})}</script>
      <script src="/client.js"></script>
    </body>
  </html>`
}

function renderApp (props) {
  const store = configureStore()
  const app = (
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>
  )
  const markup = DOM.renderToString(app)
  return renderPage({ markup, title: 'counter', intialState: store.getState() })
}

app.get('/client.js', browserify('client.js', {
  transform: [babelify]
}))

app.get('/*', (req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error)
    } else if (redirectLocation) {
      res.redirect(redirectLocation)
    } else if (renderProps) {
      res.send(renderApp(renderProps))
    } else {
      res.status(404).end()
    }
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('listening on', port)
})
