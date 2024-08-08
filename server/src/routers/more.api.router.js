const router = require('express').Router();
const { Product } = require('../../db/models'); 
const { verifyAccessToken } = require('../middlewares/verifyToken');
const multer = require("multer");

// const upload = multer({ dest: 'public/image/',  })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').at(-1));
  },
  fileEntry: function (req, file, cd) {
    const uniqueSuffix = Data.now() + '-' + Math.round(Math.random() * 1E9)
    cd(null, 'image-' + uniqueSuffix + '.' + file.body.split('.').at(-1))
  }
})

const upload = multer({ storage: storage })

router
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const entries = await Product.findOne({ where: { id } });
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

module.exports = router;
