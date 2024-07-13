const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/store', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Define schema for fruitsndvegetables collection
const VegetableSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    weightOptions: [
        {
            weight: String,
            price: Number
        }
    ],
});

// Create model for fruitsndvegetables collection
const Vegetable = mongoose.model('vegetables', VegetableSchema);

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://192.168.183.66:3000', 
    credentials: true  
}));

// Routes
app.get('/', (req, res) => {
    res.send('App is Working'); // Test route
});

// Route to fetch all fruits and vegetables
app.get('/fruitsndvegetables', async (req, res) => {
    try {
        const Vegetables = await Vegetable.find();
        res.json(Vegetables);
    } catch (err) {
        console.error('Error fetchingvegetables:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
