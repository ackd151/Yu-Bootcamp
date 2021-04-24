const express = require("express");
const router = express.Router();
const { bmiCalcForm, bmiResult } = require("../contollers/bmiCalc");

router.get("/", bmiCalcForm);

router.post("/", bmiResult);

module.exports = router;
