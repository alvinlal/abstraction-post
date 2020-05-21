const multer = require("multer");
const path = require("path");

//Set storage Engine for multer
const storageEngine = multer.diskStorage({
  destination: `./public/images/`,
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
//init upload var
const upload = multer({
  storage: storageEngine,
}).single("image");

exports.saveImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        file: {
          url: `http://localhost:4777/${req.file.filename}`,
        },
      });
    } else {
      return res.status(200).json({
        success: 1,
        file: {
          url: `http://localhost:4777/${req.file.filename}`,
        },
      });
    }
  });
};
