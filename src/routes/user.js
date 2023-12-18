const router = require('express').Router();;
const User = require("../models/user")

router.post ("/", async (req, res) => {
    const user = new User(req.body);

    try {
        const newUser= await user.save();
    return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

})


router.get("/" , async (req,res) => {
    try {
        const users = await User.find({});
        if(!users) return res.status(404).json({message: "Users not found"});
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

router.put("/:id", async (req,res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndUpdate({_id : userId}, req.body, {new : true});

        if(!user){
            return res.status(404).json({message : "User not found"})
        }

        return res.status.json(user)
    } catch (error) {
        return res.status(500).json({message : error.message})
    }

})

router.get("/:id", async (req,res) => {
    try {
        const user = await User.findById({_id : req.params.id})
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
})

module.exports = router