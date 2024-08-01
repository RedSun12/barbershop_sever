
const express = require('express');
const router = express.Router();
const { User } = require('../../db/models');

router.patch('/edit/userSurName/:id', async (req, res) => {
    try {
        const { usersurname } = req.body;
        const editUser = await User.update({
          usersurname: String(usersurname),
        }, {
            where: { id: req.params.id },
        });
        res.json({ usersurname, message: 'OK', status: 200 });
    } catch (error) {
        res.json({ message: error, status: 500 });
    }
});

module.exports = router;