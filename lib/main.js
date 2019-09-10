"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const core = require('@actions/core');
const github = require('@actions/github');
const HTML5ToPDF = require("html5-to-pdf");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const htmlFile = core.getInput('htmlFile');
            const output = core.getInput('output');
            core.debug(`Start conver ${htmlFile} to PDF`);
            (() => __awaiter(this, void 0, void 0, function* () {
                const html5ToPDF = new HTML5ToPDF({
                    launchOptions: { dumpio: true },
                    inputPath: htmlFile,
                    outputPath: output
                });
                yield html5ToPDF.start();
                yield html5ToPDF.build();
                yield html5ToPDF.close();
                console.log("PDF Generate DONE");
            }))();
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
