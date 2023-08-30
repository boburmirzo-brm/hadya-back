const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv/config")

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log("Mongodb is connected"))
    .catch(()=> console.log("Mongodb is not connected"))

app.get('/', async(req,res)=> {
    res.send('App is running perfectly!')
})

app.use("/", require("./router"))


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));