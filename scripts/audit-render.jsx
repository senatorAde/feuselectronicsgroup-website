// Local server-rendered integration harness: no browser, provider or form calls.
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'

export function renderPage(Component, location = '/') {
  return renderToStaticMarkup(
    <StaticRouter location={location}>{createElement(Component)}</StaticRouter>,
  )
}