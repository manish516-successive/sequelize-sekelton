import * as path from 'path';
import * as dotenv from 'dotenv';
import { DatabaseInterface } from '../interfaces/db.interface';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
const result = dotenv.config({ path: dotenv_path });

export const DatabaseConfig: DatabaseInterface = {
   dialect: process.env.DB_TYPE as any,
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT) || 3306,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   autoLoadModels: true,
};