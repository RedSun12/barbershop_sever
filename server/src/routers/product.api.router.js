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
  .post('/', verifyAccessToken, upload.single("image"), async (req, res) => {
    const { title, manufacturer, composition, hairType, size, price } = req.body;
    const image = req.file;
    // console.log('FFFFFFFFF', req.file)
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
      // console.log('2222')
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Product.findOne({ where: { id } });
      // if (res.locals.user?.id === 1) {
        task.destroy();
        res.sendStatus(200);
      // } else {
      //   res.status(400).json({ message: 'У вас нет прав на удаление записи' });
      // }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .put('/:id', verifyAccessToken, upload.single("image"), async (req, res) => {
    const image = req.file;
    // console.log('asdasdas', req.body.image)
    try {
        const { id } = req.params
        // console.log(req.body)
      const { title, manufacturer, composition, hairType, size, price } = req.body;
      if (Number(id)) {
        // console.log('1111')
        const entrie = await Product.findOne({ where: { id } });
       console.log('ENTRYE!!!!!!!!', image)
        if (image) {
          entrie.dataValues.image = `image/${image.filename}`;
          await entrie.update({ image: `image/${image.filename}` });
          // console.log('ZDAROVA', `image/${image.fileEntry}`)
          // entrie.dataValues.image = `image/${image.fileEntry}`;
          // await entrie.update({ image: `image/image-${Date.now() + '-' + Math.round(Math.random() * 1E9)}.${image.split('.').at(-1)}` });
          // res.json(entry);
          // entrie.save()
          
        }
        // if (title && manufacturer && composition && hairType && size && price) {
          // console.log(entrie.dataValues.title)
          // entrie.dataValues.title = title;
          // entrie.dataValues.manufacturer = manufacturer;
          // entrie.dataValues.composition = composition;
          // entrie.dataValues.hairType = hairType;
          // entrie.dataValues.size = size;
          // entrie.dataValues.price = price;
          await entrie.update({ title, manufacturer, composition, hairType, size, price });
          // entrie.save()
          res.json(entrie);
        // } else {
        //   res.status(400).send('Нет необходимых данных для изменений');
        // }
      } else {
        res.status(400).send('Запись по такому id не найдена');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  //! СТАРЬЁ ДЛЯ ПРИМЕРА
  // .get('/themes', async (req, res) => {
  //   try {
  //     const themes = await Theme.findAll();
  //     res.status(200).json(themes);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // })
  // .get('/themes/:id', async (req, res) => {
  //   try {
  //     const theme = await Theme.findByPk(req.params.id, {
  //       include: [Question]
  //     });
  //     if (theme) {
  //       res.status(200).json(theme);
  //     } else {
  //       res.status(404).json({ error: 'Theme not found' });
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // })
  // .get('/questions', async (req, res) => {
  //   try {
  //     const questions = await Question.findAll();
  //     res.status(200).json(questions);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // })
  // .get('/questions/:id', async (req, res) => {
  //   try {
  //     const question = await Question.findByPk(req.params.id, {
  //       include: [Theme]
  //     });
  //     if (question) {
  //       res.status(200).json(question);
  //     } else {
  //       res.status(404).json({ error: 'Question not found' });
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // })
  // .put('/questions/:id', async (req, res) => {
  //   try {
  //     const [updated] = await Question.update(req.body, {
  //       where: { id: req.params.id }
  //     });
  //     if (updated) {
  //       const updatedQuestion = await Question.findByPk(req.params.id);
  //       res.status(200).json(updatedQuestion);
  //     } else {
  //       res.status(404).json({ error: 'Question not found' });
  //     }
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // });

module.exports = router;
