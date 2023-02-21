import multer from "multer";
import fs from 'fs';

// export default () => {
//   let feedFolder;


//   return multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 500
//     },
//     fileFilter: fileFilter

//   });

// }

const fileUploader = (destinationFolder) => {

  const folderToCreate = `./public/${destinationFolder}`;


  const fileFilter = async (req, file, cb) => {
    let feedFolder = '';
    console.log("File MimeType iS: =>", file.mimetype)
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype.includes("image")) {
      feedFolder = "images/"
      /// TODO true ka mtlb hai write krdo file
      // TODO if you want to store a file to upload and save
      //  then pass <true> as second parameter in callback like below
      //  cb(null, true);


      await fs.existsSync(folderToCreate)
      cb(null, true);
    }
    else if (file.mimetype === 'video/quicktime' /*|| file.mimetype === 'image/png'*/) {
      feedFolder = "videos/"

      cb(null, true);
    } else if (file.mimetype === 'application/zip' /*|| file.mimetype === 'image/png'*/) {
      feedFolder = "zip_files/"
      cb(null, true);
    } else if (file.mimetype === 'application/octet-stream' /*|| file.mimetype === 'image/png'*/) {
      feedFolder = "zip_files/"

      cb(null, true);
    } else if (file.mimetype === 'application/pdf' /*|| file.mimetype === 'image/png'*/) {
      feedFolder = "pdf_documents/"

      cb(null, true);
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' /*|| file.mimetype === 'image/png'*/) {
      feedFolder = "pdf_documents/"

      cb(null, true);
    } else if (file.mimetype === 'image/svg+xml' /*|| file.mimetype === 'image/png'*/) {

      // console.log(req.body.red)
      feedFolder = "svg_xml/"
      cb(null, true);
    }

    else {
      /// TODO agr false pass kryn gyn cb ko to file write nhin hogi. cb(null, false);  ==>   cb(null, false);


      // console.log(file.red)
      feedFolder = "public/"
      cb(null, true);
    }
    // TODO if you want to reject a file to upload and save
    //  then pass <false> as second parameter in callback like below
    //  cb(null, false);

  };
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(folderToCreate, { recursive: true })
      console.log("destinication")
      cb(null, `./public/${destinationFolder}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = new Date().toISOString().replace(/:/g, '-') + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 500
    },
    fileFilter: fileFilter,
  });
}
let storage = multer.diskStorage(`./public`);
const maxSize = 2 * 1024 * 1024;

export let uploadFile = multer({
  storage: storage,
  limits: {}
}).single("file");

export default fileUploader;
