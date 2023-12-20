// import {
//   connectDatabase,
//   insertDocument,
//   getAllDocumment,
// } from '../../../helpers/db-util';

// async function handler(req, res) {
//   const eventId = req.query.eventId;
//   let client;
//   try {
//     client = await connectDatabase();
//   } catch (error) {
//     res.status(500).json({ message: 'connecting to the database failed!' });
//     return;
//   }

//   if (req.method === 'GET') {
//     let documents;
//     try {
//       documents = await getAllDocumment(client, 'comments', { _id: -1 });
//     } catch (error) {
//       res.status(500).json({ comments: 'getting comments failed' });
//     }
//   }

//   if (req.method === 'POST') {
//     const { email, name, text } = req.body;
//     if (
//       !email.includes('@') ||
//       !name ||
//       !text ||
//       text.trim() === '' ||
//       name.trim() === ''
//     ) {
//       res.staus(422).json({ message: 'invalide input' });
//       return;
//     }
//     const newComment = {
//       email,
//       name,
//       text,
//       eventId,
//     };
//     let result;
//     try {
//       result = await insertDocument(client, 'comment', newComment);
//       newComment._id = result.insertedId;
//       res.status(201).json({ message: 'Added comment', comment: newComment });
//     } catch (error) {
//       res.status(500).json({ message: 'Inserting comment failed!' });
//     }
//   }
//   client.close();
// }
// export default handler;
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
    }
  }

  client.close();
}

export default handler;
