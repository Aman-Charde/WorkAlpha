const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middleware/upload');

router.get('/', projectController.getAllProjects);
router.post('/', upload.single('image'), projectController.createProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;