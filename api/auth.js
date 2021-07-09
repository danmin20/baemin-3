const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.post("/check", async (req, res, next) => {
  const { email } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      res.status(403).json({
        message: "Already exists",
      });
    } else {
      res.status(200).json({
        message: "OK",
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
