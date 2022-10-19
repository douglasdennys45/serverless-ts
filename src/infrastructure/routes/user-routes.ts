import { routeAdapter } from '@/infrastructure/adapters'
import { mountAddUserController } from '@/infrastructure/factories/interfaces'

export const addUser = routeAdapter(mountAddUserController())
