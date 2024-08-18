// src/models/index.ts
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: 'postgres',
    logging: false,
  }
);

export { sequelize };
