export class JobEditController {
    static $inject = [ '$http', '$stateParams']

    job: any = null

    constructor($http: ng.IHttpService, $stateParams: { [key: string]: string }) {
        $http<any>({
            method: 'GET',
            url: 'http://localhost:8888/jobs/' + $stateParams.id
        }).then(response => {
            this.job = response.data
        })
    }
}
