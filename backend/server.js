const express = require("express");
const { connectToMongoDB} = require("./connect")
const urlRoute = require('./routes/url')
const URL= require('./models/url')
var cors = require("cors")

const app= express();
const PORT =8001;

 connectToMongoDB("mongodb://127.0.0.1:27017/url")
 .then(()=>console.log("mongo connected")
 )

 app.use(cors())
 app.use(express.json());


 

app.use("/url",urlRoute);

app.get('/:shortId',async (req,res)=>
{
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            {
                shortId,
            },
            {
                $push:
                {
                    visitHistory: {
                        timestamp:Date.now(),
                    }
                }
            }
        );
        res.redirect(entry.redirectURL);

})

app.listen(PORT,()=> console.log("Server Started"));