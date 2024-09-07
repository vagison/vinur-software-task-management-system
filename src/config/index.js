import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  dbName: process.env.DB_NAME,
  dbUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.DB_HOST}/?retryWrites=true&w=majority`,
  isDebugEnabled: process.env.DB_DEBUG === 'true',
};

export { dbConfig };
