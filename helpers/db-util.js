// import { MongoClient } from 'mongodb';

// export async function connectDatabase() {
//   const client = await MongoClient.connect(
//     {PutYourMongoDBLink}
//   );
//   return client;
// }

// export async function insertDocument(client, collection, document) {
//   const db = client.db();
//   const result = await db.collection(collection).insertOne(document);
//   return result;
// }

// export async function getAllDocumment(client, collection, sort) {
//   const db = client.db();
//   const documents = await db
//     .collection(collection)
//     .find()
//     .sort({ _id: sort })
//     .toArray();

//   return documents;
// }
import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://souilah:souilah@cluster0.u4dgsxh.mongodb.net/events?retryWrites=true&w=majority'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
