const core = require('@actions/core');
const HTML5ToPDF = require("html5-to-pdf")

async function run() {
  try {
    const htmlFile = core.getInput('htmlFile');
    const output = core.getInput('output');

    core.debug(`Start conver ${htmlFile} to PDF`);

    (async () => {
      const html5ToPDF = new HTML5ToPDF({
        launchOptions:{dumpio: true},
        inputPath: htmlFile,
        outputPath: output
      })

      await html5ToPDF.start()
      await html5ToPDF.build()
      await html5ToPDF.close()
      console.log("PDF Generate DONE")
    })()

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
