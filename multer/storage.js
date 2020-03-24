const multer = require('multer');
const fs =require('fs');
var uploadModelInfo= multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === "dataFile") { // if uploading resume
        if (!fs.existsSync('ModelData'))
            fs.mkdirSync('ModelData');
        cb(null, 'ModelData')
      } else if(file.fieldname === "modelFile") { // else uploading image
        if (!fs.existsSync('ModelFiles'))
            fs.mkdirSync('ModelFiles');
        cb(null, 'ModelFiles')
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })

  var uploadUserData = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync('UserData/'+req.userId)){
        fs.mkdirSync('UserData/'+req.userId, {recursive: true});
      }
      cb(null, 'UserData/'+req.userId)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })

  var uploadAnswerFile = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('Answer Scripts')){
      fs.mkdirSync('Answer Scripts');
    }
    cb(null, 'Answer Scripts')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
  });

  const uploadAlgorithmFile = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('Algorithms')){
      fs.mkdirSync('Algorithms');
    }
    cb(null, 'Algorithms')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
  });
module.exports.uploadAlgorithm = multer({ storage: uploadAlgorithmFile })
module.exports.uploadAnswerFile = multer({ storage: uploadAnswerFile })
module.exports.uploadAdmin = multer({ storage: uploadModelInfo })   
module.exports.uploadUserData = multer({ storage: uploadUserData })