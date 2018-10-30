const { parse } = require('url')
const compress = require('micro-compress')
const session = require('micro-cookie')
const match = require('micro-route/match')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

async function main (req, res) {
  const parsedUrl = parse(req.url, true)
  const { query } = parsedUrl

  session(req, res)

  if (match(req, '/api/v1/a'))
    return require('./services/a')(req, res)

  if (match(req, '/b'))
    return app.render(req, res, '/b', query)

  return handle(req, res, parsedUrl)
}

async function setup (handler) {
  await app.prepare()
  return compress(handler)
};

module.exports = setup(main)
