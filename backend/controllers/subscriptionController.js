const Subscription = require('../models/Subscription');

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check for existing subscription
    const existing = await Subscription.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const subscription = new Subscription({ email: email.toLowerCase() });
    await subscription.save();
    res.status(201).json({ message: 'Subscribed successfully', data: subscription });
  } catch (error) {
    console.error('Error subscribing:', error.message);
    res.status(500).json({ error: 'Failed to subscribe', details: error.message });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ subscribedAt: -1 });
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error.message);
    res.status(500).json({ error: 'Failed to fetch subscriptions', details: error.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error.message);
    res.status(500).json({ error: 'Failed to delete subscription', details: error.message });
  }
};