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
  .get('/', async (req, res) => {
    try {
      const entries = await Product.findAll();
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .get('/more/:id', async (req, res) => {
    try {
      const entries = await Product.findAll();
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .post('/', verifyAccessToken, upload.single("image"), async (req, res) => {
    const { title, manufacturer, composition, hairType, size, price } = req.body;
    const image = req.file;
    try {
      const entry = await Product.create({
        title,
        image: `image/${image.filename}`,
        manufacturer,
        composition,
        hairType,
        size,
        price,
      });
      res.json(entry);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Product.findOne({ where: { id } });
        task.destroy();
        res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .put('/:id', verifyAccessToken, upload.single("image"), async (req, res) => {
    const image = req.file;
    try {
        const { id } = req.params
      const { title, manufacturer, composition, hairType, size, price } = req.body;
      if (Number(id)) {
        const entrie = await Product.findOne({ where: { id } });
        if (image) {
          entrie.image = `image/${image.filename}`;
        }
          // await entrie.update({ image: `image/${image.filename}`});
          await entrie.update({ title, manufacturer, composition, hairType, size, price, image: entrie.image });
          // entrie.save()
          res.json(entrie);
      } else {
        res.status(400).send('Запись по такому id не найдена');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;
