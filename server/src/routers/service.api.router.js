const router = require('express').Router();
const { Service } = require('../../db/models');
const multer = require("multer");
const { verifyAccessToken } = require('../middlewares/verifyToken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image/')
    // console.log(destination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').at(-1));
    // console.log(file);
  },
})

const upload = multer({ storage: storage });

router
  .get('/', async (req, res) => {
  try {
    const entries = await Service.findAll();
    // console.log(entries);
    res.json(entries)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

  .post('/', verifyAccessToken, upload.single("foto"), async (req, res) => {
  const { name, price, comment } = req.body
  const foto = req.file;
  try {
  const entrie = await Service.create({  name: name[0], price: price[0], comment: comment[0], foto: `image/${foto.filename}`})
  res.json(entrie)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})
  .delete('/:id', verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      await Service.destroy({ where: { id } });
      res.status(200).send('Запись успешно удалена');
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  })

  .put('/:id', verifyAccessToken, upload.single("foto"), async (req, res) => {
    console.log(upload.single("foto"))
  const foto = req.file;
  const { id } = req.params
  const { name, price, comment } = req.body;
  console.log(req.body)
  console.log(req.file)
    try {
      if (Number(id)) {
        const entrie = await Service.findOne({ where: { id } });
        if (foto) {
          entrie.foto = `image/${foto.filename}`;
        }
          await entrie.update({ name: name, price: price, comment: comment, foto: entrie.foto });
          console.log(entrie);
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