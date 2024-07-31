const router = require('express').Router();
const { Service } = require('../../db/models');


router.get('/', async (req, res) => {
  try {
    const foto = await Service.findAll();
    const result = foto.sort((a, b) => a.id > b.id ? 1 : -1);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, price, foto } = req.body
    console.log(name, price, foto)
    const entrie = await Service.create({  name, price, foto  })
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