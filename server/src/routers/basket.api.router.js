const router = require('express').Router();
const { Basket } = require('../../db/models');
const { Product } = require('../../db/models');
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router
  .post('/newOrder', verifyAccessToken, async (req, res) => {
    // console.log('11111', req.body)
    const {
      idProduct,
      idUser,
    } = req.body;
    
    try {
      const [product] = await Product.findOrCreate({
        where: { id: idProduct },
        // where: { id },
      });

      // const idProduct = product.id;
      const orderLast = await Basket.findOne({ where: { idUser, idProduct } });
      if (!orderLast) {
        const order = await Basket.create({ idUser, idProduct });
        res.json(order);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .get('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    // console.log('uhjniji', id)
    try {
      const order = await User.findAll({
        where: { id },
        include: {
          model: Product,
          attributes: ['id', 'title', 'image', 'manufacturer', 'composition', 'hairType', 'size'],
        },
      });
      console.log('RES', order[0].Products)
      res.json(order[0].Products);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Basket.findOne({ where: { idProduct: id } });
      order.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
