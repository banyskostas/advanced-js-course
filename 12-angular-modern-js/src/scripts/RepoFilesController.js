export function RepoFilesController($http, $stateParams) {
    var self = this
    this.files = []
    this.username = $stateParams.username
    this.repo = $stateParams.repo
    this.path = $stateParams.path
    var url = 'https://api.github.com/repos/' +
        $stateParams.username +
        '/' + $stateParams.repo + '/contents/' +
        $stateParams.path

    $http({
        method: 'GET',
        url: url
    }).then(function(response) {
        self.user = null
        self.files = response.data
            .map(function(f) {
                return {
                    name: f.name,
                    type: f.type,
                }
            })
    })
}
