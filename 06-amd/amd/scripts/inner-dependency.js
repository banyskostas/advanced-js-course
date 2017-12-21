define(function() {
    return {
        log: function(message) {
            console.log('Inner dependency', message)
        }
    }
})
