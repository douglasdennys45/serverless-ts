import { faker } from '@faker-js/faker'
import { Collection } from 'mongodb'

import { MongoConnection } from '@/infrastructure/database/mongodb'
import { addUser } from '@/main'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { runStubFunctionFromBindings, createHttpTrigger } = require('stub-azure-function-context')

let collection: Collection
describe('Test User Rotes Infrastructure', () => {
  beforeAll(async () => {
    const { MONGO_URL } = process.env
    if (MONGO_URL) { await MongoConnection.connect(MONGO_URL) }
  })

  beforeEach(async () => {
    collection = await MongoConnection.getCollection('users')
    await collection.deleteMany({})
  })

  describe('POST /v1/users', () => {
    test('should return 201', async () => {
      const context = await runStubFunctionFromBindings(addUser, [
        {
          type: 'httpTrigger',
          name: 'req',
          direction: 'in',
          data: createHttpTrigger('POST', 'http://localhost:7071/api/v1/users', null, null, {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric()
          })
        },
        { type: 'http', name: 'res', direction: 'out' }
      ], new Date())
      expect(context.res.status).toEqual(201)
    })

    test('should return 400', async () => {
      const context = await runStubFunctionFromBindings(addUser, [
        {
          type: 'httpTrigger',
          name: 'req',
          direction: 'in',
          data: createHttpTrigger('POST', 'http://localhost:7071/api/v1/users', null, null, {
            name: faker.name.fullName(),
            email: faker.internet.email()
          })
        },
        { type: 'http', name: 'res', direction: 'out' }
      ], new Date())
      expect(context.res.status).toEqual(400)
    })
  })
})
