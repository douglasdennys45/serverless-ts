import { Collection } from 'mongodb'

import { MongoConnection } from '@/infrastructure/database/mongodb'

const {
  runStubFunctionFromBindings,
  createQueueTrigger,
  createQueueTriggerFromMessage
} = require('stub-azure-function-context')

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
    test('deve retornar 201 ao chamar a rota', async () => {
      const context = await runStubFunctionFromBindings(functionToTest, [
        { type: 'httpTrigger', name: 'req', direction: 'in', data: createHttpTrigger('GET', 'http://example.com') },
        { type: 'http', name: 'res', direction: 'out' }
      ], new Date())
    })
  })
})
