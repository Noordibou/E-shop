import mongoose from 'mongoose';

interface Connection {
  isConnected?: boolean;
}

const connection: Connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState === 1;
    if (connection.isConnected) {
      return;
    }
    await mongoose.disconnect();
  }
  
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in your environment variables.");
  }

  const db = await mongoose.connect(process.env.DATABASE_URL);
  connection.isConnected = db.connections[0].readyState === 1;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    }
  }
}

const convertDocToObj = (doc: any) => {
  if (doc) {
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
  }

  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
