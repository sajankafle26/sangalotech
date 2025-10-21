import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

interface MongoConnection {
  client: MongoClient;
  db: Db;
}

/**
 * Safely connect to MongoDB at runtime (not build time).
 * This avoids Next.js build failures on Vercel.
 */
export async function connectToDatabase(): Promise<MongoConnection> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) throw new Error('Missing MONGODB_URI environment variable');
  if (!dbName) throw new Error('Missing DB_NAME environment variable');

  // Use cached connection if already connected
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw new Error('Failed to connect to the database');
  }
}
