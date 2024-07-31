const router = require('express').Router();
const gamesRouter = require('./games.api.router');
const authRouter = require('./auth.api.router');
const tokenRouter = require('./token.api.router');

const fotoRouter = require('./barberfoto.api.router');
const productRouter = require('./product.api.router');
const editUserRouter = require('./api.editUser.router')
const oneUserByIdRouter = require('./api.oneUserById.router')
const serviceRouter = require('./service.api.router')


router.use('/tokens', tokenRouter); 
router.use('/auth', authRouter);
router.use('/', gamesRouter);
router.use('/foto', fotoRouter);
router.use('/product', productRouter);
router.use('/', editUserRouter);
router.use('/', oneUserByIdRouter);
router.use('/service', serviceRouter);


module.exports = router;
