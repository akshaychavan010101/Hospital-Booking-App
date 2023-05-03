const express = require("express");
const { UserRouter } = require("./routes/users.routes");
require("dotenv").config();
const db = require("./models/index");

const app = express();
app.use(express.json());
app.use("/user",UserRouter)

app.get("/",(req,res)=>{
    res.send("home page")
})

db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("started")
    })

})
