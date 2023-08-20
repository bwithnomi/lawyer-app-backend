import Admin from "../../models/admin.js"
import bcrypt from 'bcrypt';

import db from "../connection.js";
const handle = async () => {
  
  const salt = await bcrypt.genSalt(6);
  const password = await bcrypt.hash('admin123', salt);
  await Admin.create({
    name: 'Admin',
    email: 'admin@adalat.pk',
    password: password,
  });
}
handle().then(() => {
  console.log('Database seeder run successfully');
  process.exit(0)
})
export default handle;