const express = require('express');
const router = express.Router();
const { User } = require('../../db/models');

router.patch('/edit/userName/:id', async (req, res) => {
    try {
        const { username } = req.body;
        const editUser = await User.update({
          username: String(username),
        }, {
            where: { id: req.params.id },
        });
        res.json({ username, message: 'OK', status: 200 });
    } catch (error) {
        res.json({ message: error, status: 500 });
    }
});

module.exports = router;