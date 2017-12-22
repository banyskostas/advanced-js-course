var innerDependency = require('./inner-dependency')

function log(message) {
    innerDependency.log('Dependency 1:' + message)
}

module.exports.log = log
