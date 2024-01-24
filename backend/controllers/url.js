const shortid = require('shortid');


const URL = require('../models/url')


async function handleGenerateNewURL(req,res)
{
    const body = req.body;
    console.log(req)

    if(!body.url)
    return res.status(400).json({error:"Url is require"});

    const shortID= shortid();
    await URL.create({
           shortId :shortID,
           redirectURL: body.url,
           visitHistory:[],
    });
   
    return res.json({id:shortID});
    

}

module.exports=
{handleGenerateNewURL}