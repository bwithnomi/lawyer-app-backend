import mongoose from 'mongoose';
import dbConfig from './../config/database.config.js'

mongoose.set('strictQuery', false);
// main().catch(err => console.log(err));
await mongoose.connect(`${dbConfig.connectionUrl}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if(err) throw err;
  // console.log('Connected to mongodb')
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to mongodb");
});
export default db