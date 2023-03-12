import fs from "fs"
import { randomFillSync } from "crypto";

const random = (() => {
  const buf = Buffer.alloc(16);
  return () => randomFillSync(buf).toString('hex');
})();

export const nativeUpload = (path, fileToUpload) => {
  fs.mkdirSync(`public/${path}`, { recursive: true })
  var ext = random() + '.' + fileToUpload.originalname.substr(fileToUpload.originalname.lastIndexOf('.') + 1);
  let tempRand = random();
  const fileStream = fs.createWriteStream(`public/${path}/${tempRand}.${ext}`);
  fileStream.write(fileToUpload.buffer);
  return `public/${path}/${tempRand}.${ext}`;
}