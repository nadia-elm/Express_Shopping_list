

const express =require("express");
const ExpressError = require("./expressError");
const router = new express.Router();
const items = require("./fakeDb")

// const ITEMS = [
//   { name: "popsicle", price: 1.45 },
//   { name: "cheerios", price: 3.4 },
//   { name: "bounty", price: 3.99 },
// ];


router.get('/', (req, res, next) =>{
    try{
        res.json({items })
    }catch(err){
        return next(err)
    }
    
})


router.get('/:name', (req,res, next)=>{
    try{
    const item = items.find(item => item.name ===req.params.name)
    if (item === undefined){
        throw new ExpressError("Item not found", 404)
    }
     return res.json({ item: item})

    }catch(err){
        return next(err)
    }
})

router.post("/", function (req, res, next){
     try{
        if(!req.body.name) throw new ExpressError("please enter a name ", 400)
        if(!req.body.price) throw new ExpressError("please enter a price ", 400)
        const newItem = {name : req.body.name, price: req.body.price}
        items.push(newItem)
        res.status(201).json({item: newItem})

    }catch(err){
        return next(err)
    }
    
})

router.patch("/:name", function(req, res, next){
    try{
    const itemToUpdate = items.find(item => item.name === req.params.name)
    if(itemToUpdate === undefined){
        throw new ExpressError("Item not found", 404)
    }
    itemToUpdate.name = req.body.name
    itemToUpdate.price = req.body.price;
    res.json({updated: itemToUpdate})

    }catch(err){
        return next(err);
    }
   
    

})

router.delete("/:name", function(req, res, next){
    try{
    const itemToDelete = items.find(
          (item) => item.name === req.params.name
        );
    if(itemToDelete === undefined){
        throw new ExpressError("Item not found", 404)
    }
        items.splice(itemToDelete,1)
        res.json({ message: "Deleted"})

    }catch(err){
        return next(err)
    }
        

})



module.exports = router