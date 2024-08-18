// src/testConnection.ts
import { sequelize } from './models/index';

async function testConnection() {
  try {
    console.log('sequlize printing..', sequelize)
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
