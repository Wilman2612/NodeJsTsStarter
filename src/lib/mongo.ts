import { Db, MongoClient, ObjectId } from 'mongodb'

const MONGO_URI = process.env.MONGO_URL || `mongodb://localhost:27017/test`

export default class MongoLib<T> {
  client: MongoClient

  dbName: string

  static connection: Promise<Db>

  collection: string

  constructor(collection: string) {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true })
    this.collection = collection
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err)
          }
          console.log('conectado')
          resolve(this.client.db('test'))
        })
      })
    }
    return MongoLib.connection
  }

  getAll(query?: any) {
    return this.connect().then((db) => {
      return db.collection(this.collection).find(query).toArray() as Promise<T[]>
    })
  }

  get(id: any) {
    return this.connect().then((db) => {
      return db.collection(this.collection).findOne({ _id: new ObjectId(id) }) as Promise<T>
    })
  }

  getBy(query?: any) {
    return this.connect().then((db) => {
      return db.collection(this.collection).findOne(query) as Promise<T>
    })
  }

  create(data: T) {
    return this.connect()
      .then((db) => {
        return db.collection(this.collection).insertOne(data)
      })
      .then((result) => result.insertedId)
  }

  update(id: any, data: T) {
    return this.connect()
      .then((db) => {
        return db
          .collection(this.collection)
          .updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true })
      })
      .then((result) => result.upsertedId || id)
  }

  delete(id: any) {
    return this.connect()
      .then((db) => {
        return db.collection(this.collection).deleteOne({ _id: new ObjectId(id) })
      })
      .then(() => id)
  }
}
