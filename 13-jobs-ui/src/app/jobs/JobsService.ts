const apiEndpoint = 'http://localhost:8888/'

export interface Address {
    city: string
    street?: string
    house?: string
    flat?: string
}

export interface Job {
    id?: string
    employerId?: string
    name: string
    description?: string
    startDate: string
    category: string
    expectedDuration: number
    rate: number
    address: Address
}

export class JobService {
    static $inject = ['$http']

    constructor(private $http: ng.IHttpService) {
    }

    getById(id: string): Promise<Job> {
        return this.$http<Job>({
            method: 'GET',
            url: `${apiEndpoint}jobs/` + id
        }).then(response => response.data)
    }

    list(): Promise<Job[]> {
        return this.$http<Job[]>({
            url: `${apiEndpoint}jobs`,
            method: 'GET'
        }).then(response => response.data)
    }

    createNew(job: Job): Promise<void> {
        return <Promise<void>><any> this.$http<void>({
            method: 'POST',
            url: `${apiEndpoint}jobs/`,
            data: job
        })
    }

    saveExisting(id: string, job: Job): Promise<void> {
        return <Promise<void>><any> this.$http<void>({
            method: 'POST',
            url: `${apiEndpoint}jobs/` + id,
            data: job
        })
    }

    delete(id: string): Promise<void> {
        return <Promise<void>><any> this.$http({
            url: `${apiEndpoint}jobs/` + id,
            method: 'DELETE'
        })
    }
}
