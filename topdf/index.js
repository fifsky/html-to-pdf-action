const autoBind = require("auto-bind")
const puppeteer = require("puppeteer")
const map = require("lodash/map")
const pickBy = require("lodash/pickBy")
const Server = require("./server")
const {
  readBodyOrFile,
  convertPath,
  getTemplateFilePath,
  convertIncludes,
} = require("./util")

class HTML5ToPDF {
  constructor(options) {
    this.options = this.parseOptions(options)
    autoBind(this)
  }

  parseOptions(options) {
    const {
      inputBody,
      inputPath,
      outputPath,
      templateUrl,
      renderDelay,
      launchOptions,
      include = [],
    } = options
    const legacyOptions = options.options || {}
    const pdf = pickBy(
      options.pdf || {
        landscape: legacyOptions.landscape,
        format: legacyOptions.pageSize,
        printBackground: legacyOptions.printBackground,
      },
    )
    if (!pdf.path && outputPath) {
      pdf.path = convertPath(outputPath)
    }
    const templatePath = getTemplateFilePath(options)
    const body = readBodyOrFile(inputBody, inputPath)
    return {
      body,
      pdf,
      templatePath,
      templateUrl,
      launchOptions,
      include: convertIncludes(include),
      renderDelay,
    }
  }

  includeAssets() {
    const includePromises = map(this.options.include, ({ type, filePath }) => {
      if (type === "js") {
        return this.page.addScriptTag({
          path: filePath,
        })
      }
      if (type === "css") {
        return this.page.addStyleTag({
          path: filePath,
        })
      }
    })
    includePromises.push(() => {
      return this.page.addStyleTag({
        path: getTemplateFilePath("pdf.css"),
      })
    })
    includePromises.push(() => {
      return this.page.addStyleTag({
        path: getTemplateFilePath("highlight.css"),
      })
    })
    return Promise.all(includePromises)
  }

  async start() {
    this.server = new Server(this.options)
    await this.server.listen()
    this.browser = await puppeteer.launch(this.options.launchOptions)
    this.page = await this.browser.newPage()
    await this.page.goto(this.server.address(), {
      waitUntil: "networkidle2",
    })
    await this.page.setContent(this.options.body)
    await this.includeAssets()
    if (this.options.renderDelay) {
      await this.page.waitFor(this.options.renderDelay)
    }
    return this.page
  }

  async build() {
    const buf = await this.page.pdf(this.options.pdf)
    if (!this.options.pdf.path) {
      return buf
    }
  }

  async close() {
    await this.browser.close()
    await this.server.close()
  }
}

module.exports = HTML5ToPDF
