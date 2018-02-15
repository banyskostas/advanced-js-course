function log(message) {
    console.log('Inner dependency', message)
}
module.exports.log = log
