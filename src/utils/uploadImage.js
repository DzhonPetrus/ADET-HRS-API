const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../public/uploads/"));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

//   IMAGE UPLOAD MIDDLEWARE
module.exports = (req, res, next) => {
  let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
  }).single("imageUpload");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.status(500).send({
        error: true,
        data: [],
        message: [req.fileValidationError],
      });
    // } else if (!req.file) {
    //   return res.status(500).send({
    //     error: true,
    //     data: [],
    //     message: ["Please select an image to upload"],
    //   });
    } else if (err instanceof multer.MulterError) {
      return res.status(500).send({
        error: true,
        data: [],
        message: [err],
      });
    } else if (err) {
      return res.status(500).send({
        error: true,
        data: [],
        message: [err],
      });
    }

    next();
  });
};


