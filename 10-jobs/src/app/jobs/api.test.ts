import { test } from 'ava'
import { jobCreateValidator } from './api'

test('Returns invalid result for invalid job', t => {
    const invalid = {
        foo: 'bar'
    }

    const result = jobCreateValidator.validate(invalid)
    t.false(result.isValid)
})
