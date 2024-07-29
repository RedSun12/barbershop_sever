const router = require('express').Router();
const gamesRouter = require('./games.api.router');
const authRouter = require('./auth.api.router');
const tokenRouter = require('./token.api.router');
const scoreRouter = require('./score.api.router')

router.use('/tokens', tokenRouter);
router.use('/auth', authRouter);
router.use('/', gamesRouter);
router.use('/user', scoreRouter);

module.exports = router;
