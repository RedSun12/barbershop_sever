const router = require('express').Router();
const { Product } = require('../../db/models'); 
const { verifyAccessToken } = require('../middlewares/verifyToken');

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
  .post('/', verifyAccessToken, async (req, res) => {
    console.log('ghbdtn')
    const { title, image, manufacturer, composition, hairType, size } = req.body;
    try {
      const entry = await Product.create({
        title,
        image,
        manufacturer,
        composition,
        hairType,
        size,
      });
      res.json(entry);
    } catch (error) {
      console.log('2222')
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
