const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/', subscriptionController.subscribe);
router.get('/', subscriptionController.getAllSubscriptions);
router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;