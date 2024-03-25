const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  let isUserExist;

  try {
    isUserExist = await User.findOne({ username });
  } catch(err) {
    return console.log(err);
  }

  if(isUserExist) {
    return res.status(400).json({ message:'Usernamer isalready exist...Please try with another username'})
  }

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // The second argument is the saltRounds

    // Create a new user document with the hashed password
    const newUser = new User({ username, password: hashedPassword });

    // Save the user document to the database
    await newUser.save();

    console.log('Registration successful');
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Registration failed:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Passoword is correct : "+isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login
    const token = jwt.sign({ username: user.username }, 'ok', {
      expiresIn: '1h', // Set the token expiration time
    });
  
    // Send the token as part of the response
    res.status(200).json({ username: user.username, message: 'Login successful', token });

  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};


module.exports = {
  register,
  login,
};
