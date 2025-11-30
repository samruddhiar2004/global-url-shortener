require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const Url=require('./models/Url');

const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected Successfully!'))
    .catch((err) => console.error('Connection Failed:',err));

app.post('/api/shorten',async(req,res)=>{
    const{originalUrl}=req.body;
    if (!originalUrl) return res.status(400).json({error:'URL is required'});
    try {
        const url=await Url.create({originalUrl});
        res.json(url);
    } catch(err){
        console.error(err);
        res.status(500).json({error:'Server Error'});
    }


});

app.get('/:shortId',async(req,res)=>{
    try {
        const url = await Url.findOne({shortId: req.params.shortId});
        if(url){
            url.clicks++;
            url.save();
            return res.redirect(url.originalUrl);
        }else{
            return res.status(404).json({error:'URL not found'});
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Server Error'});
    }
});


app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});