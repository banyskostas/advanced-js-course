import { test } from 'ava'
import { hash, verify } from './hash'

test('Should verify hash with the same value', async t => {
    const password = 'abc123'
    const hashed = await hash(password)
    const verified = await verify(hashed, password)
    t.true(verified)
})

test('Should not verify hash with different value', async t => {
    const password = 'abc123'
    const hashed = await hash(password)
    const verified = await verify(hashed, 'abc1234')
    t.false(verified)
})
