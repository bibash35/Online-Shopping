// controllers/contactController.js
const Contact = require('../model/Contact');

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contactMessage = new Contact({
      name,
      email,
      message,
    });

    await contactMessage.save();

    res.status(201).json({ msg: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ msg: 'An error occurred while sending your message' });
  }
};

const getMessages = async (req, res) => {
    try {
      const messages = await Contact.find(); // Fetch all messages from the database
      res.status(200).json(messages); // Send the messages back in the response
    } catch (error) {
      console.error("Error in getMessages:", error);
      res.status(500).json({ msg: 'An error occurred while retrieving messages' });
    }
  };
  
module.exports = {
  sendMessage,
  getMessages,

};
