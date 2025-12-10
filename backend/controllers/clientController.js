const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    console.error('❌ Error fetching clients:', error);
    res.status(500).json({ error: 'Failed to fetch clients', details: error.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    console.log('📦 Received form data:', { body: req.body, file: req.file ? req.file.filename : 'NO FILE' });
    
    const { name, designation, description, company } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validation
    if (!name || !designation || !description) {
      console.warn('⚠️ Missing required fields:', { name, designation, description });
      return res.status(400).json({ error: 'Name, designation, and description are required' });
    }

    if (!image) {
      console.warn('⚠️ No image file provided');
      return res.status(400).json({ error: 'Image is required' });
    }

    const client = new Client({
      name,
      designation,
      description,
      image,
      company: company || ''
    });

    await client.save();
    console.log('✅ Client created successfully:', client._id);
    res.status(201).json(client);
  } catch (error) {
    console.error('❌ Error creating client:', error);
    res.status(500).json({ error: 'Failed to create client', details: error.message, stack: error.stack });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    console.log('✅ Client deleted successfully:', req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting client:', error);
    res.status(500).json({ error: 'Failed to delete client', details: error.message });
  }
};