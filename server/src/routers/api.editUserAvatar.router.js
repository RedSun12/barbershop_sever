

const express = require('express');
const router = express.Router();
const { User } = require('../../db/models');

router.patch('/edit/userAvatar/:id', async (req, res) => {
    try {
        const { avatar } = req.body;
        const editUser = await User.update({
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