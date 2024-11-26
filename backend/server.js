const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMjU1NDQ4NiwiaWF0IjoxNzMyNTU0NDg2fQ.Y9Qugxt3Ep7RhPWlYXXk1NlsAn68xdBOo0EHLMScyg4";

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://laxmisinghdhirendra555:dApTkVFu01oD8dYf@cluster0.kn9iu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: Date,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/register', async (req, res) => {
  const { name, dateOfBirth, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, dateOfBirth, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
    res.json({ token, user: { name, email, dateOfBirth } });
  } catch (error) {
    res.status(400).json({ message: 'User registration failed!' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found!' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password!' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user: { name: user.name, email, dateOfBirth: user.dateOfBirth } });
  } catch (error) {
    res.status(400).json({ message: 'Login failed!' });
  }
});

app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
