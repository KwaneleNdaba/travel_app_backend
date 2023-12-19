const router = require('express').Router();;
const User = require("../models/user")
const bcrypt = require("bcrypt")

router.post ("/", async (req, res) => {


    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
            
        });
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

router.delete("/:id", async (req,res) => {
    const id = req.params.id;
    try {
        const user = User.findByIdAndDelete({_id:id});
        if(!user) return res.status(404).json({message: error.message})
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

module.exports = router