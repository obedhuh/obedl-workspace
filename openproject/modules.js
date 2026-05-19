// ============================================================
// MODULE 1: BMI CALCULATION
// ============================================================
function calcBMI(weight, weightUnit, height, heightUnit, heightFt) {
  // Normalize to metric
  let kg, meters;

  if (weightUnit === 'lbs') {
    kg = weight * 0.453592;
  } else {
    kg = weight; // already kg
  }

  if (heightUnit === 'cm') {
    meters = height / 100;
  } else if (heightUnit === 'ft') {
    let totalInches = height * 12 + (heightFt || 0);
    meters = totalInches * 0.0254;
  } else if (heightUnit === 'in') {
    meters = height * 0.0254;
  } else {
    meters = height; // already meters
  }

  let bmi = kg / (meters * meters);
  bmi = Math.round(bmi * 100) / 100;

  let category;
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  return { bmi, category };
}

// ============================================================
// MODULE 2: UNIT FIXING
// ============================================================
function normalizeUnits(weight, weightUnit, height, heightUnit, heightFt) {
  let weight_kg;
  let originalWeightUnit = weightUnit;

  if (weightUnit === 'lbs') {
    weight_kg = weight * 0.453592;
  } else {
    weight_kg = weight;
  }

  let height_m;
  let originalHeightUnit = heightUnit;

  if (heightUnit === 'cm') {
    height_m = height / 100;
  } else if (heightUnit === 'ft') {
    let totalInches = height * 12 + (heightFt || 0);
    height_m = totalInches * 0.0254;
    originalHeightUnit = 'ft/in';
  } else if (heightUnit === 'in') {
    height_m = height * 0.0254;
  } else {
    height_m = height;
  }

  return {
    weight_kg: Math.round(weight_kg * 100) / 100,
    height_m: Math.round(height_m * 100) / 100,
    original_units: {
      weight: originalWeightUnit,
      height: originalHeightUnit
    }
  };
}

// ============================================================
// EXPORT (for Node.js / ES module)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calcBMI, normalizeUnits };
}
