import { connect, set } from 'mongoose';
import { NODE_ENV, DB_URI } from '@config';
import { logger } from '@/utils/logger';

export const dbConnection = async () => {
  const dbConfig = { url: DB_URI };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }

  try {
    await connect(dbConfig.url);
    logger.info(`Connected to database`)
  } catch (error) {
    logger.error(error.message)
  }
};
