import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const root = path.join(repoRoot, "quartz-site", "public")
const port = Number(process.env.PORT ?? process.argv[2] ?? 8097)

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
}

function send(file, res) {
  res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" })
  fs.createReadStream(file).pipe(res)
}

http
  .createServer((req, res) => {
    const rawPath = decodeURIComponent((req.url ?? "/").split("?")[0])
    const requestPath = rawPath.endsWith("/") ? `${rawPath}index.html` : rawPath
    const file = path.resolve(root, `.${requestPath}`)

    if (!file.startsWith(root)) {
      res.writeHead(403)
      res.end("Forbidden")
      return
    }

    fs.stat(file, (error, stat) => {
      if (!error && stat.isFile()) {
        send(file, res)
        return
      }

      const indexFile = path.join(file, "index.html")
      fs.stat(indexFile, (indexError, indexStat) => {
        if (!indexError && indexStat.isFile()) {
          send(indexFile, res)
          return
        }

        const htmlFile = `${file}.html`
        fs.stat(htmlFile, (htmlError, htmlStat) => {
          if (!htmlError && htmlStat.isFile()) {
            send(htmlFile, res)
            return
          }

          res.writeHead(404)
          res.end("Not found")
        })
      })
    })
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Serving ${root} at http://127.0.0.1:${port}`)
  })
