const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const FoodItem = require('./models/FoodItem');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/api/food', async (req, res) => {
  const items = await FoodItem.find();
  res.json(items);
});

app.post('/api/food', async (req, res) => {
  const newItem = new FoodItem(req.body);
  await newItem.save();
  res.json(newItem);
});

app.post('/api/order', (req, res) => {
  console.log('Order received:', req.body);
  res.json({ message: 'Order placed successfully!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
