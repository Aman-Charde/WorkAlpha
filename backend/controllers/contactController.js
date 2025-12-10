const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, city } = req.body;

    // Validation
    if (!fullName || !email || !mobileNumber || !city) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({
      fullName,
      email,
      mobileNumber,
      city
    });

    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully', data: contact });
  } catch (error) {
    console.error('Error submitting contact:', error.message);
    res.status(500).json({ error: 'Failed to submit contact form', details: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Failed to fetch contacts', details: error.message });
  }
};