module.exports = {
  bmiCalcForm(req, res, next) {
    res.render("bmi-calc/bmi-calc-form", { title: "BMI Calculator Form" });
  },

  bmiResult(req, res, next) {
    const { height, weight, metersInches, kgsLbs } = req.body;
    let hValue = parseFloat(height),
      wValue = parseFloat(weight);
    if (metersInches === "inches") {
      hValue *= 0.0254;
    }
    if (kgsLbs === "lbs") {
      wValue *= 0.45392;
    }
    const bmi = (wValue / (hValue * hValue)).toFixed(1);
    res.render("bmi-calc/bmi-result", { bmi, title: "BMI Calculator Result" });
  },
};
