import 'dotenv/config'
import './infrastructure/config/module-alias'

import env from '@/infrastructure/config/env'
import { MongoConnection } from '@/infrastructure/database/mongodb'

MongoConnection.connect(env.MONGO_URL).catch((err) => console.error(err))

export * from '@/infrastructure/config/app'
