const core = require('@actions/core');
const HTML5ToPDF = require("../topdf")

async function run() {
    try {
        const htmlFile = core.getInput('htmlFile');
        const output = core.getInput('output');

        console.log(`Start conver ${htmlFile} to PDF`);

        (async () => {
            const html5ToPDF = new HTML5ToPDF({
                launchOptions:{
                  executablePath: '/usr/bin/chromium-browser',
                  args:['--no-sandbox', '--headless', '--disable-gpu']},
                inputPath: htmlFile,
                outputPath: output,

            })

            await html5ToPDF.start()
            await html5ToPDF.build()
            await html5ToPDF.close()
            console.log("PDF Generate DONE:",output)
        })()

    } catch (error) {
        core.setFailed(error.message);
    }
}