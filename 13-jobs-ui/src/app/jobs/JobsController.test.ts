import { JobsController } from './JobsController'
import { JobService } from './JobsService'
import { Mock, Times } from 'typemoq'

/*
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
}*/

describe('Jobs controller', () => {
    const exampleJobs = [
        {
            id: '1',
            employerId: '2',
            name: 'foo',
            description: 'bar',
            startDate: new Date().toISOString(),
            category: 'restaurants',
            expectedDuration: 120,
            rate: 12.5,
            address: {
                city: 'Vilnius',
                street: 'Savanoriu g.'
            }
        },
        {
            id: '2',
            employerId: '3',
            name: 'baz',
            description: 'qux',
            startDate: new Date().toISOString(),
            category: 'cleaning',
            expectedDuration: 60,
            rate: 10,
            address: {
                city: 'Kaunas',
                street: 'Laisves pr.'
            }
        }
    ]

    it('Should initially load data from service', async () => {
        const jobsPromise = Promise.resolve(exampleJobs)
        const jobsService = Mock.ofType(JobService)
        jobsService.setup(x => x.list())
            .returns(() => jobsPromise)

        const sut = new JobsController(jobsService.object)
        await jobsPromise
        expect(sut.jobs).toEqual(exampleJobs)
    })

    it('Should delete job using service', async () => {
        window.confirm = () => true
        const jobs = [...exampleJobs]
        const jobsPromise = Promise.resolve(jobs)
        const service = Mock.ofType(JobService)
        service.setup(x => x.list())
            .returns(() => jobsPromise)
        const deletePromise = Promise.resolve()
        service.setup(x => x.delete(jobs[0].id))
            .returns(() => deletePromise)

        const sut = new JobsController(service.object)
        await jobsPromise
        const jobToDelete = jobs[0]
        sut.deleteJob(jobToDelete)
        await deletePromise

        service.verify(x => x.delete(jobToDelete.id), Times.atLeastOnce())
        expect(sut.jobs).toEqual([exampleJobs[1]])
    })
})
