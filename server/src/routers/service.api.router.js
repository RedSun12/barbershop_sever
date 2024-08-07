const router = require('express').Router();
const { Service } = require('../../db/models');
const multer = require("multer");
const { verifyAccessToken } = require('../middlewares/verifyToken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').at(-1));
  },
})

const upload = multer({ storage: storage });

router
  .get('/', verifyAccessToken, async (req, res) => {
  try {
    // const foto = await Service.findAll();
    // const result = foto.sort((a, b) => a.id > b.id ? 1 : -1);
    // res.status(200).json(result);
    const entries = await Service.findAll();
    // console.log(entries);
    res.json(entries)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})
  .post('/', verifyAccessToken, upload.single("foto"), async (req, res) => {
  const { name, price } = req.body
  const foto = req.file;
  try {
  const entrie = await Service.create({  name: name[0], price: price[0], foto: `image/${foto.filename}`})
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
  const foto = req.file;
    try {
      const { id } = req.params
      const { name, price } = req.body;
      if (Number(id)) {
        const entrie = await Service.findOne({ where: { id } });
        if (foto) {
          entrie.foto = `image/${foto.filename}`;
          // await entrie.update({ foto: `image/${foto.filename}`});
        }
          await entrie.update({ name: name[0], price: price[0], foto: entrie.foto });
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