define(['inner-dependency'], function(innerDependency) {
    return {
        log: function(message) {
            innerDependency.log('Dependency 1:' + message)
        }
    }
})
