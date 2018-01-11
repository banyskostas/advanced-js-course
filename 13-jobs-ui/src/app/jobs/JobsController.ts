export class JobsController {
    static $inject = [ '$http' ]
    jobs: any[] = []
    loading = true

    constructor($http: ng.IHttpService) {
        $http<any[]>({
          url: 'http://localhost:8888/jobs',
          method: 'GET'
        }).then(response => {
          this.jobs = response.data
          this.loading = false
        }).catch(() => this.loading = false)
    }
}
