import 'isomorphic-fetch'

export interface Job {
    id: string
    name: string
}

export class JobsService {
    constructor(private endpoint: string) {
    }

    async getById(id: string): Promise<Job> {
        const response = await fetch(this.endpoint + '/jobs/' + id)
        return await response.json()
    }

    async createNew() {
        await fetch(this.endpoint + '/jobs/', {
            method: 'POST',
            body: JSON.stringify({
                id: 'foo',
                name: 'bar',
            })
        })
    }
}
