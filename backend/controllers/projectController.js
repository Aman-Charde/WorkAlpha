const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    console.log('📦 Received form data:', { body: req.body, file: req.file ? req.file.filename : 'NO FILE' });
    
    const { name, description, category, location } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validation
    if (!name || !description) {
      console.warn('⚠️ Missing required fields:', { name, description });
      return res.status(400).json({ error: 'Name and description are required' });
    }

    if (!image) {
      console.warn('⚠️ No image file provided');
      return res.status(400).json({ error: 'Image is required' });
    }

    const project = new Project({
      name,
      description,
      image,
      category: category || 'General',
      location: location || 'N/A'
    });

    await project.save();
    console.log('✅ Project created successfully:', project._id);
    res.status(201).json(project);
  } catch (error) {
    console.error('❌ Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project', details: error.message, stack: error.stack });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    console.log('✅ Project deleted successfully:', req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project', details: error.message });
  }
};