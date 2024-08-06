const router = require('express').Router();
const { Homefoto } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const foto = await Homefoto.findAll();
    res.status(200).json(foto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Homefoto.destroy({ where: { id } });
    res.status(200).send('Запись успешно удалена');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
