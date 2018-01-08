export class JobsController {
    static $inject = [ '$http' ]
    jobs = []
    loading = true

    constructor($http) {
        $http({
          url: 'http://localhost:8888/jobs',
          method: 'GET'
        }).then(response => {
          this.jobs = response.data
          this.loading = false
        }).catch(() => this.loading = false)
    }
}
