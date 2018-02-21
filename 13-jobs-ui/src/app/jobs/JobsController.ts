import { JobService, Job } from './JobsService'

export class JobsController {
    static $inject = [ 'JobService' ]
    jobs: Job[] = []
    loading = true

    constructor(private jobService: JobService) {
        this.jobService.list()
            .then(jobs => {
                this.jobs = jobs
                this.loading = false
            }).catch(() => this.loading = false)
    }

    deleteJob(job: any) {
        if (confirm('Are you sure?')) {
            this.jobService.delete(job.id)
                .then(() => {
                    const index = this.jobs.indexOf(job)
                    if (index >= 0) {
                        this.jobs.splice(index, 1)
                    }
                })
        }
    }
}
