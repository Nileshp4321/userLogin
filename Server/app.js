const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors({
  origin:["https://deploy-mern-1"],
  methods:["POST","GET","PUT","DELETE"],
  credentials:true
}));
app.use(cookieParser());

// Set the port you want to use
const PORT = process.env.PORT || 3001;
// mongodb+srv://nileshp:Nileshhh@cluster0.cwmozw9.mongodb.net/Cluster0?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://nileshp:Nileshhh@cluster0.cwmozw9.mongodb.net/Cluster0?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
