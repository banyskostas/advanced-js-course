import { test } from 'ava'
import { createEmployer } from './api'
import { Mock, Times } from 'typemoq'
import { EmployersStorage } from './storage'

test('Saves employer to storage', async t => {
    const employer = {
        id: 'labas',
        name: 'maxima'
    }
    const mock = Mock.ofType<EmployersStorage>()
    mock.setup(x => x.saveNew(employer))
        .returns(() => Promise.resolve(employer))

    createEmployer({
        id: 'labas',
        name: 'maxima'
    }, mock.object)

    mock.verify((x: EmployersStorage) => x.saveNew(employer), Times.once())
    t.pass()
})
