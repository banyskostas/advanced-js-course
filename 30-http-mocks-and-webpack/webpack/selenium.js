const selenium = require('selenium-standalone')
const execa = require('execa')

function installSelenium() {
    return new Promise(resolve => {
        selenium.install({
            logger: console.log
        }, resolve)
    })
}

let seleniumProcess = null

function startSelenium() {
    console.log('Starting selenium...')
    stopSelenium()
    return new Promise((resolve, reject) => {
        selenium.start((error, child) => {
            seleniumProcess = child
            if (error) {
                reject(error)
            } else {
                console.log('Selenium started')
                resolve()
            }
        })
    })
}

function stopSelenium() {
    if (seleniumProcess) {
        console.log('Stopping selenium')
        seleniumProcess.kill()
        seleniumProcess = null
    }
}

function runTests() {
    console.log('Running tests')
    const jest = execa.shell('node node_modules/.bin/jest ./src/e2etests')
    jest.stdout.pipe(process.stdout)
    jest.stderr.pipe(process.stderr)
    return jest
}

installSelenium()
    .then(startSelenium)
    .then(runTests)
    .then(stopSelenium)
    .catch(stopSelenium)
