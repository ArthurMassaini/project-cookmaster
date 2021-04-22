const express = require('express');
const rescue = require('express-rescue');

const recipesController = require('../controllers/recipesController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/recipes', authMiddleware, rescue(recipesController.createRecipe));

module.exports = router;
