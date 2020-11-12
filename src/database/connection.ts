import { createConnection } from 'typeorm';

createConnection().then(() => {
  console.log('🚀 database connected')
})