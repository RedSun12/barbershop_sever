const router = require('express').Router();
const { User } = require('../../db/models');
const cookieConfig = require('../configs/cookiesConfig');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateToken');
const { main } = require('../utils/mailer')

router.post('/signup', async (req, res) => {
  const { isAdmin, username, usersurname, email, password } = req.body;
  // console.log(isAdmin, username, usersurname, email, password, 'asdasdasd')
  if (!(username && email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    // await User.create({username: 'asd', email:'111@123', password:'123'})
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: { isAdmin, username, usersurname, email, password: await bcrypt.hash(password, 10) },
    });
    if (isCreated) {
      main(email)
    }
    // console.log('********/////')
    // res.end();
    if (!isCreated) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
      const plainUser = user.get();
      delete plainUser.password;
      delete plainUser.createdAt;
      delete plainUser.updatedAt;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: 'No user found' });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  } else {
    const plainUser = user.get();
    delete plainUser.password;
    delete plainUser.createdAt;
    delete plainUser.updatedAt;
    
    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  }
});

router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.put('/user', async (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});



module.exports = router;