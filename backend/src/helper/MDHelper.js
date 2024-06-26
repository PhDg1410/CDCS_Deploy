// const { mdToPdf }    = require('md-to-pdf')
// const { v4: uuidv4 } = require('uuid')

import {mdToPdf} from 'md-to-pdf'
// import { v4 as uuidv4 } from 'uuid';

const makePDF = async (markdown,name) => {
    return new Promise(async (resolve, reject) => {
        console.log(name)
        try {
            await mdToPdf(
                { content: markdown },
                {
                    dest: `./src/static/document/${name}.pdf`,
                    launch_options: { args: ['--no-sandbox', '--js-flags=--noexpose_wasm,--jitless'] } 
                }
            );
            console.log("makePDF")
            resolve(true);
        } catch (e) {
            console.log("makePDF error")
            reject(e);
        }
    });
}

export default makePDF;