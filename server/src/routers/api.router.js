const router = require('express').Router();
const gamesRouter = require('./games.api.router');
const authRouter = require('./auth.api.router');
const tokenRouter = require('./token.api.router');

const fotoRouter = require('./barberfoto.api.router');
const productRouter = require('./product.api.router');
const basketRouter = require('./basket.api.router');
const editUserNameRouter = require('./api.editUserName.router');
const editUserSurNameRouter = require('./api.editUserSurName.router');
const editUserAvatarRouter = require('./api.editUserAvatar.router');
const oneUserByIdRouter = require('./api.oneUserById.router');
const serviceRouter = require('./service.api.router');

router.use('/tokens', tokenRouter); 
router.use('/auth', authRouter);
router.use('/', gamesRouter);
router.use('/foto', fotoRouter);
router.use('/product', productRouter);
router.use('/', editUserNameRouter);
router.use('/', editUserSurNameRouter);
router.use('/', editUserAvatarRouter);
router.use('/', oneUserByIdRouter);
router.use('/service', serviceRouter);
router.use('/busket', basketRouter);


module.exports = router;
