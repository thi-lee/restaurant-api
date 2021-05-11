const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({dest: '../uploads/'});

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, '../uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname);
    }
  });

  router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received');
      return res.send({
        success: true
      })
    }
  });

router.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    console.log(req.file)
    // req.body will hold the text fields, if there were any
  })
  
  router.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })
  
  var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
  router.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body will contain the text fields, if there were any
  })

module.exports = router;