// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(cookieParser(""));
app.use(cors());


app.get('/', (req, res, next)=>{
    console.log('base req');
    return res.json(200);
})

const orderRouter = require("./src/routes/order.route");
const userRouter = require("./src/routes/user.route");
const purchaseRouter = require("./src/routes/purchase.route")

app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/purchase", purchaseRouter);

const URL = `mongodb+srv://abhikhya:ashi3666@crud.yjywtf4.mongodb.net/dummyDatabase?retryWrites=true&w=majority`
    try {
        mongoose.connect(URL);
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }




// Start the server
const port = process.env.PORT || 5000;;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
