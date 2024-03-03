//budget API
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
//const budgetData = require('./budget-data.json');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ChartEntry = require('./chartEntryModel');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongodb_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Fetch budget endpoint
app.get('/budget', async (req, res) => {
  try {
    const budgetData = await ChartEntry.find({}); // Fetch all entries from the chart
    res.json({ myBudget: budgetData });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch chart data endpoint
app.get('/chart-data', async (req, res) => {
  try {
    const data = await ChartEntry.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add new chart entry endpoint
app.post('/add-chart-entry', async (req, res) => {
  try {
    const newEntry = new ChartEntry(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});