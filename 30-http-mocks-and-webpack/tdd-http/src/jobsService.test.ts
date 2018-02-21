import * as nock from 'nock'
import { JobsService, Job } from './jobsService'
import * as uuid from 'uuid'
import 'tslib'

describe('JobsService', () => {
    const exampleJobs: Job[] = [
        { id: 'foo', name: 'bar' },
        { id: 'labas', name: 'vakaras' }
    ]

    beforeEach(() => nock.cleanAll())

    exampleJobs.forEach(job => {
        it(`Should retrieve a single job with id ${job.id} from api`, async () => {
            const endpoint = 'http://' + uuid.v4()
            const sut = new JobsService(endpoint)
            nock(endpoint)
                .get('/jobs/' + job.id)
                .reply(200, job)

            const actual = await sut.getById(job.id)
            expect(actual).toEqual(job)
        })
    })

    it('Should create a job using api', async () => {
        const endpoint = 'http://' + uuid.v4()
        const sut = new JobsService(endpoint)

        const request = nock(endpoint)
            .post('/jobs/', {
                id: 'foo',
                name: 'bar',
            })
            .reply(201)

        await sut.createNew({
            id: 'foo',
            name: 'bar'
        })

        expect(request.isDone()).toBeTruthy()
    })
})
