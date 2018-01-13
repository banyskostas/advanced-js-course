import { JobService, Job, Address } from './JobsService'
import * as moment from 'moment'

function padLeft(str: string, prefix: string, requiredLength: number): string {
    while(str.length < requiredLength) str = prefix + str;
    return str;
}

class JobForm {
    public id: string
    public name: string
    public description?: string
    public startDate: string
    public category: string
    public expectedDuration: string
    public rate: number
    public address: Address

    constructor(job?: Job) {
        if (!job) {
            return
        }
        this.id = job.id || ''
        this.name = job.name
        this.description = job.description
        this.startDate = moment(job.startDate).format('YYYY-MM-DD HH:mm:ss')
        this.category = job.category
        const totalMinutes = job.expectedDuration
        const hours = Math.floor(totalMinutes / 60).toString()
        const minutes = (totalMinutes % 60).toString()
        this.expectedDuration = `${padLeft(hours, '0', 2)}:${padLeft(minutes, '0', 2)}`
        this.rate = job.rate
        this.address = job.address
    }

    toData(): Job {
        const durationParts = this.expectedDuration.split(':')
        const hours = parseInt(durationParts[0])
        const minutes = parseInt(durationParts[1])
        return {
            name: this.name,
            description: this.description,
            startDate: moment(this.startDate).toISOString(),
            category: this.category,
            expectedDuration: hours * 60 + minutes,
            rate: this.rate,
            address: this.address,
            employerId: this.id ? undefined : '1'
        }
    }
}

export class JobEditController {
    static $inject = [ 'JobService', '$state', '$stateParams']

    job: JobForm|null = null
    canSave: boolean = false

    constructor(private jobService: JobService, private $state: any, $stateParams: { [key: string]: string }) {

        const jobId = $stateParams.id
        if (jobId === 'new') {
            this.job = new JobForm()
            this.canSave = true
        } else {
            this.jobService.getById($stateParams.id)
                .then(job => {
                    this.job = new JobForm(job)
                    this.canSave = true
                })
        }
    }

    saveJob() {
        if (!this.job) {
            return
        }

        this.canSave = false
        if (this.job.id) {
            this.jobService.saveExisting(this.job.id, this.job.toData())
                .then(() => this.$state.go('jobs.list'))
        } else {
            this.jobService.createNew(this.job.toData())
                .then(() => this.$state.go('jobs.list'))
        }
    }
}
