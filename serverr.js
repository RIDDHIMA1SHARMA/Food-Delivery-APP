const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/foodDeliveryDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Models
const Food = mongoose.model("Food", new mongoose.Schema({
    name: String,
    price: Number,
    description: String
}));

const Order = mongoose.model("Order", new mongoose.Schema({
    customerName: String,
    items: [{ name: String, price: Number }],
    total: Number,
    status: { type: String, default: "Pending" }
}));

// Routes
app.get('/foods', async (req, res) => {
    const foods = await Food.find();
    res.json(foods);
});

app.post('/order', async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order placed successfully!" });
});

app.get('/orders', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

app.listen(5000, () => console.log("Server running on port 5000"));
