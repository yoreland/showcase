const fs = require('fs-extra')
const https = require('https')
const crypto = require('crypto')

const SourceMapConsumer = require('source-map').SourceMapConsumer

const analyse = (srcMapURL) => {
    const BASE_CACHE_PATH = __dirname + '/cache/'
    const BASE_OUTPUT_PATH = __dirname + '/output/' + srcMapURL.substr(srcMapURL.lastIndexOf('/') + 1) + '/'
    const BASE_OUTPUT_LIB_PATH = BASE_OUTPUT_PATH + 'node_modules/'

    const md5 = (content) => {
        let md5Maker = crypto.createHash('md5');
        md5Maker.update(content);
        return md5Maker.digest('hex');
    }

    const download = (url, callback) => {
        const hash = md5(url)
        const cacheFileName = BASE_CACHE_PATH + hash
        if (fs.existsSync(cacheFileName)) {
            fs.readFile(cacheFileName, 'utf8', (err, data) => {
                console.log("From cache")
                callback(data)
            })
        } else {
            return https.get(url, function(response) {
                let body = '';

                let totalSize = parseInt(response.headers['content-length'])

                response.on('data', function(d) {
                    body += d
                    printDownloading(body, totalSize)
                });

                response.on('end', function() {
                    printFinishDownload(body)
                    fs.outputFile(cacheFileName, body, error => {
                        callback(body)
                    })
                });
            });
        }
    }

    const printDownloading = (body, totalSize) => {
        let statusLine = '\r'
        statusLine += 'Downloading '
        statusLine += srcMapURL.substr(srcMapURL.lastIndexOf('/') + 1)
        statusLine += ' '
        statusLine += (body.length / totalSize * 100).toFixed(2)
        statusLine += '%'
        process.stdout.write(statusLine)
    }

    const printFinishDownload = (body) => {
        let statusLine = 'Finish Download '
        statusLine += srcMapURL.substr(srcMapURL.lastIndexOf('/') + 1)
        statusLine += ' total size: '
        statusLine += body.length
        statusLine += 'bytes'
        console.log('\n' + statusLine)
    }

    download(srcMapURL, (rawSourceMap) => {
        try {
            const consumer = new SourceMapConsumer(rawSourceMap);

            if (consumer.hasContentsOfAllSources()) {
                consumer.sources.forEach(fileName => {
                    if (fileName.indexOf('webpack://') !== 0) {
                        return
                    }

                    let fileContent = consumer.sourceContentFor(fileName)
                    fileName = fileName.replace(/^webpack:\/\//, '')
                    fileName = fileName.replace(/^\//, BASE_OUTPUT_PATH)
                    fileName = fileName.replace(/^.*\/\~\//, BASE_OUTPUT_LIB_PATH)
                    fs.outputFile(fileName, fileContent, error => {
                        // console.log(error) // TODO, debug code, to delete before commit
                    })
                })

                console.log('Please check here for sources: ', BASE_OUTPUT_PATH)
            } else {
                console.log('TODO')
            }
        } catch (e) {
            console.log("Failed to parse", srcMapURL) // TODO, debug code, to delete before commit
        }
    })
}

let jsURLs = `
https://testweb.xiaoheiban.cn/live/static/js/main.38a520a9.chunk.js
https://testweb.xiaoheiban.cn/live/static/js/2.c76941e6.chunk.js
`

jsURLs.split('\n').filter(Boolean).forEach(jsURL => {
    const srcMapURL = jsURL + '.map'
    analyse(srcMapURL)
})
