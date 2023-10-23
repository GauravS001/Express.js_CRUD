const express = require('express')
const router = express.Router();
const mM = require("../Models/movie");

router.post('/save/:t/:d/:g', async (req,res)=>{
   const title = req.params.t;
   const director = req.params.d;
   const genere = req.params.g;

    try{
        const newMovie = new mM({
            title,
            director,
            genere,
        })
    
        const saveM = await newMovie.save();
        res.status(201).json(saveM);
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get("/allMovies", async (req,res)=>{
     try{
        const movies = await mM.find();
        res.json(movies);
     }catch(err){
        res.status(500).json({error: err.message});
     }
})

router.get("/getById/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const movie = await mM.findById(id);
        if(movie === null){
            res.json({err: "No movie by this id"})
        }else{
            res.json(movie);
        }
    }catch(err){
       res.status(500).json({error: err.message})
    }
})

router.put("/update/:id", async function(req,res){
    try{

    const id = req.params.id
    const updateData = req.body;

    const uM = await mM.findOneAndUpdate(
        {_id: id},
        {$set: updateData},
        {new: true}
    );

    if(!uM){
        return res.status(404).json({err: "Movie not found"});
    }

     res.json(uM);
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

router.delete("/delete/:id", async function(req,res){
    try{
        const id = req.params.id
        
        const delM = await mM.findByIdAndRemove(id)
        
        if(!delM){
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json({message: "Movie deleted successfully"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;