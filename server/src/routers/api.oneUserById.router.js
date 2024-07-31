/* eslint-disable import/newline-after-import */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const express = require('express');
const router = express.Router();
const { User } = require('../../db/models/index');
const { where } = require('sequelize');

router.get('/api/one/user/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const item = await User.findOne({ where: { id: id } });
      if (item) {
        res.json({ item, message: 'OK', status: 200 });
      };
    } catch (error) {
        res.json({ message: error, status: 500 });
    }
});

module.exports = router;