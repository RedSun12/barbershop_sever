const express = require('express');
const router = express.Router();
const { User } = require('../../db/models');

router.put('/api/edit/user/:id', async (req, res) => {
    try {
        const { username, usersurname, avatar } = req.body.data;
        const editUser = await User.update({
          username: String(username),
          usersurname: String(usersurname),
          avatar: avatar,
        }, {
            where: { id: req.params.id },
        });
        res.json({ message: 'OK', status: 200 });
    } catch (error) {
        res.json({ message: error, status: 500 });
    }
});

module.exports = router;