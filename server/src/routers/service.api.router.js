const router = require('express').Router();
const { Service } = require('../../db/models');
const multer = require("multer");

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

router.get('/', async (req, res) => {
  try {
    // const foto = await Service.findAll();
    // const result = foto.sort((a, b) => a.id > b.id ? 1 : -1);
    // res.status(200).json(result);
    const entries = await Service.findAll();
    console.log(entries);
    res.json(entries)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', upload.single("foto"), async (req, res) => {
  // console.log('!!!!!!!!!!!!!!!!', req.body) 
  const { name, price } = req.body
  // console.log(req.file)
  const foto = req.file;
  try {
    // if (foto) {
    //   entrie.dataValues.image = `image/${image.filename}`;
    //   await entrie.update({ image: `image/${image.filename}` });
    // }
    // entrie.dataValues.image = `image/${image.filename}`;
    // await entrie.update({ image: `image/${image.filename}` });
    const entrie = await Service.create({  name: name[0], price: price[0], foto: `image/${foto.filename}`  })
    res.json(entrie)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Service.destroy({ where: { id } });
      res.status(200).send('Запись успешно удалена');
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
      const { name, price} = req.body;
    //   console.log(name, price, id, 'asdasdas')
      if (Number(id)) {
        const entrie = await Service.findOne({ where: { id } });
        if (name && price) {
          await entrie.update({ name, price });
          res.json(entrie);
        } else {
          res.status(400).send('Нет необходимых данных для изменений');
        }
      } else {
        res.status(400).send('Запись по такому id не найдена');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;