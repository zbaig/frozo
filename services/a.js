const { send, json } = require('micro')

module.exports = (req, res) => send(res, 200, {a: 1})
