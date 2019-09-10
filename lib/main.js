const core = require('@actions/core');
const HTML5ToPDF = require("../topdf")

async function run() {
    try {
        const htmlFile = core.getInput('htmlFile');
        const outputFile = core.getInput('outputFile');

        console.log("PWD:",__dirname);
        console.log(`Start conver ${htmlFile} to PDF`);

        const html5ToPDF = new HTML5ToPDF({
            launchOptions:{
              executablePath: '/usr/bin/chromium-browser',
              args:['--no-sandbox', '--headless', '--disable-gpu']},
            inputPath: htmlFile,
            outputPath: outputFile,

        })

        await html5ToPDF.start()
        await html5ToPDF.build()
        await html5ToPDF.close()
        console.log("PDF Generate DONE:",outputFile)

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();