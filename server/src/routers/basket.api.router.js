const router = require('express').Router();
const { where } = require('sequelize');
const { Basket } = require('../../db/models');
const { Product } = require('../../db/models');
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { orderMail } = require('../utils/mailer');

router
  .post('/newOrder', verifyAccessToken, async (req, res) => {
    // console.log('11111', req.body)
    const {
      idProduct,
      idUser,
    } = req.body;
    // console.log(req.body);
    
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
    try {
      const order = await User.findAll({
        where: { id },
        include: {
          model: Product,
          attributes: ['id', 'title', 'image', 'manufacturer', 'composition', 'hairType', 'size', 'price'],
        },
      });
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
  })
  .delete('/buyOrder/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    const {
      idProduct,
      idUser,
    } = req.body;
    try {
      // const product = await Product.findAll()
      const userAdmin = await User.findOne({where: { id: 1 }})
      const user = await User.findOne({where: { id }})
      const orderBuy = await Basket.findAll({where:{idUser: id}})
      const order = await User.findAll({
        where: { id },
        include: {
          model: Product,
          attributes: ['id', 'title', 'image', 'manufacturer', 'composition', 'hairType', 'size', 'price'],
        },
      });

      function generateOrderCode(length) {
        const characters = 'ABabZzSs0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

      const allProduct = order[0].Products.map((el) => el = el.dataValues.title.manufacturer).join(', ');
      console.log(userAdmin.dataValues.email)
      console.log('RESTITLE!!!!', orderBuy)
      // orderMail(user.dataValues.email, user.dataValues.username, generateOrderCode(10), allProduct)
      // orderMailAdmin(userAdmin.dataValues.email, user.dataValues.username, generateOrderCode(10), allProduct)
      orderBuy.map(el => el.destroy())[0];
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });
  

module.exports = router;
