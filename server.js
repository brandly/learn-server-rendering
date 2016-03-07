import fs from 'fs'
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
  const reset = fs.readFileSync('./styles/reset.css')
  const styles = fs.readFileSync('./styles/the.css')
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      <style>
        ${reset}
      </style>
      <style>
        ${styles}
      </style>
    </head>
    <body>
      <div id="main">${markup}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(intialState || {})}</script>
      <script src="/client.js"></script>
    </body>
  </html>`
}

function renderApp (props, callback) {
  const store = configureStore()
  const app = (
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>
  )
  const markup = DOM.renderToString(app)
  callback(renderPage({ markup, title: 'counter', intialState: store.getState() }))
}

app.get('/client.js', browserify('client.js', {
  transform: [babelify]
}))

app.get('/*', (req, res) => {
  match({routes, location: req.url}, (error, redirectLocation, props) => {
    if (error) {
      res.status(500).send(error)
    } else if (redirectLocation) {
      res.redirect(redirectLocation)
    } else if (props) {
      renderApp(props, app => {
        res.send(app)
      })
    } else {
      res.status(404).end()
    }
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('listening on', port)
})
