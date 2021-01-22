import MongoLib from 'src/lib/mongo'
import User from '../model/User'

export default class Users {
  mongoDb: MongoLib<User>

  constructor() {
    this.mongoDb = new MongoLib<User>('User')
  }

  async getAll(filter: User) {
    const movies = await this.mongoDb.getAll(filter)
    return movies || []
  }

  async get(id: string) {
    const movie = await this.mongoDb.get(id)
    return movie
  }

  async getBy(filter: User) {
    const movie = await this.mongoDb.getBy(filter)
    return movie
  }

  async create(data: User) {
    const id = await this.mongoDb.create(data)
    return id
  }

  async update(id: any, data: User) {
    const upsertedId = await this.mongoDb.update(id, data)
    return upsertedId
  }

  async delete(id: any) {
    const deletedId = await this.mongoDb.create(id)
    return deletedId
  }
}
