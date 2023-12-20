const router = require("express").Router();
const Pin = require("../models/pin");
const User = require("../models/user");

router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savePin = await newPin.save();

    return res.status(200).json(savePin);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find({});

    if (pins.length === 0) {
      return res.status(404).json({ message: "Pins not found" });
    }
    return res.status(200).json(pins);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const pin = await Pin.findByIdAndDelete({ _id: id });
    if (!pin) {
      return res.status.json({ message: "Pin not found" });
    }
    return res.status(200).json(pin);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const pin = await Pin.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!pin) {
      return res.status.json({ message: "Pin not found" });
    }
    return res.status(200).json(pin);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "wrong email" });

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatePassword) {
      return res.status(400).json({ message: "password is incorrect" });
    }

    return res
      .status(200)
      .json({ _id: user._id, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
