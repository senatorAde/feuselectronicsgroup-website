// Local server-rendered integration harness: no browser, provider or form calls.
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { Route, Routes } from 'react-router-dom'
import Layout from '../src/components/Layout'

export function renderSitePage(Component, location = '/') {
  return renderToStaticMarkup(
    <StaticRouter location={location}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={createElement(Component)} />
        </Route>
      </Routes>
    </StaticRouter>,
  )
}

export function renderPage(Component, location = '/') {
  return renderToStaticMarkup(
    <StaticRouter location={location}>{createElement(Component)}</StaticRouter>,
  )
}