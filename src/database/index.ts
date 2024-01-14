import { connect, set } from 'mongoose';
import { NODE_ENV, DB_URI } from '@config';

export const dbConnection = async () => {
  const dbConfig = {
    url: DB_URI,
  };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  await connect(dbConfig.url);
};
