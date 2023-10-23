const express = require("express")
const router = express.Router();

router.get("/:name", function(req,res){
    const name = req.params.name;
    res.send("Welcome to "+name+"'s page.")
})

module.exports = router;


