import mongoose from 'mongoose';
import dbConfig from './../config/database.config.js'

mongoose.set('strictQuery', false);
// main().catch(err => console.log(err));
await mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, async err => {
  if(err) throw err;
  await mongoose.connection.db.dropDatabase();
  console.log('database dropped successfully');
  process.exit(0);
})