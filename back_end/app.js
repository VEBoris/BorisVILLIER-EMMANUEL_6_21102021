const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://visuya:<visuyavisu>@cluster0.td0fa.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;