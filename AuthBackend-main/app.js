const express = require('express');
const mongoose = require('mongoose');

const AuthRoute = require('./routes/authRoute');
const UserRoute = require('./routes/userRoute');
const AuthMiddleware = require('./middlewares/authMiddleware');
const app = express();

//app.config
const databaseName = "Users"
const username = "samet";
const password = "6c1gnnoG9XXUjAJU";

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.xuncwul.mongodb.net/${databaseName}?retryWrites=true&w=majority`).then(() => {
    console.log("db connected");
}).catch(err => { console.log(err); });

app.use(express.json());

app.get('/', (req, res) => { res.json({ message: "welcome" }) })
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});