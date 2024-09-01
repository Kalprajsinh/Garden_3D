const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const {User , Plant} = require('./data/data'); // Adjust the path as needed
const cors = require("cors")

const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

async function SingUp(req, res) {
    const { name, email, password } = req.body;

    try {
  
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
}


async function Login(req, res) {
    const { email, password } = req.body;

    try {
   
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({
            name: user.name,
            email: user.email
        });
        
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Error signing in" });
    }
}

app.post("/login", Login); 
app.post("/signup", SingUp); 

app.post("/bookmark", async (req, res) => {
    const { email, plantname, description } = req.body;

    try {
        const newPlant = new Plant({ email, plantname, description });
        await newPlant.save();
        res.status(201).json({ message: 'Plant bookmarked successfully!' });
    } catch (error) {
        console.error('Error saving plant:', error);
        res.status(500).json({ message: 'Error saving plant' });
    }
});

app.get("/bookmark", async (req, res) => {
    const { email } = req.query; 

    try {
        const bookmarkedPlants = await Plant.find({ email });
        res.status(200).json(bookmarkedPlants);
    } catch (error) {
        console.error('Error retrieving bookmarked plants:', error);
        res.status(500).json({ message: 'Error retrieving bookmarked plants' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
