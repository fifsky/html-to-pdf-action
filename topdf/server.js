var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

class Server {
  constructor (path) {
    var serve = serveStatic(path, { 'index': ['index.html', 'index.htm'] })

    this.server = http.createServer(function onRequest (req, res) {
      serve(req, res, finalhandler(req, res))
    })

    this.server.listen(3000)
  }

  close () {
    this.server.close()
  }
}

module.exports = Server
