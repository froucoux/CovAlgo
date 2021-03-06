/*
 * A proposition for a categorization algorithm for the at-home follow-up
 * of COVID-19-suspected belgian patients.
 * 
 * Version: 0.1
 * 
 * Copyright (c) 2020 François Roucoux
 * 
 * Contact: francois.roucoux@uclouvain.be
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */


/*
 * Green - stable: Covid-19 suspect patient in stable condition
 * -> normal follow-up
 */
const green_rule_set = {
  category: "green",
  mode: "all",
  rules: [
    {
      predicate: (breathing_difficulty_borg_scale) => {
        return breathing_difficulty_borg_scale <= 2.0;
      },
      arguments: ["breathing_difficulty_borg_scale"]
    },
    {
      predicate: (agreed_containment) => {
        return agreed_containment;
      },
      arguments: ["agreed_containment"]
    },
    {
      predicate: (age) => {
        return age < 65;
      },
      arguments: ["age"]
    },
    {
      predicate: (consciousness) => {
        return consciousness == 1;
      },
      arguments: ["consciousness"]
    },
    {
      predicate: (heavy_comorbidities_count) => {
        return heavy_comorbidities_count == 0;
      },
      arguments: ["heavy_comorbidities_count"]
    },
    {
      predicate: (hydratation) => {
        return hydratation;
      },
      arguments: ["hydratation"]
    }
  ]
};


/*
 * Orange - at risk: Suspected Covid patient at risk of worsening
 * -> increased follow-up
 */
const orange_rule_set = {
  category: "orange",
  mode: "any",
  rules: [
    {
      predicate: (age) => {
        return age >= 65;
      },
      arguments: ["age"]
    },
    {
      predicate: (spo2) => {
        return (typeof spo2 !== 'undefined') && spo2 < 96 && spo2 >= 93;
      },
      arguments: ["spo2"]
    },
    {
      predicate: (heartbeats_per_minute) => {
        return (typeof heartbeats_per_minute !== 'undefined') && heartbeats_per_minute > 110;
      },
      arguments: ["heartbeats_per_minute"]
    },
    {
      predicate: (hydratation) => {
        return !hydratation;
      },
      arguments: ["hydratation"]
    },
    {
      predicate: (digestive_disorders, alone_at_home) => {
        return digestive_disorders && alone_at_home;
      },
      arguments: ["digestive_disorders", "alone_at_home"]
    },
    {
      predicate: (breathing_difficulty_borg_scale, alone_at_home) => {
        return breathing_difficulty_borg_scale >= 2.0 && alone_at_home;
      },
      arguments: ["breathing_difficulty_borg_scale", "alone_at_home"]
    },
    {
      predicate: (body_temperature, alone_at_home) => {
        return (typeof body_temperature !== 'undefined') && body_temperature >= 39.1 && alone_at_home;
      },
      arguments: ["body_temperature", "alone_at_home"]
    },
    {
      predicate: (breathing_difficulty_borg_scale) => {
        return breathing_difficulty_borg_scale >= 3.0;
      },
      arguments: ["breathing_difficulty_borg_scale"]
    },
    {
      predicate: (respiratory_rate_in_cycles_per_minute) => {
        return (typeof respiratory_rate_in_cycles_per_minute !== 'undefined')
          && respiratory_rate_in_cycles_per_minute >= 22;
      },
      arguments: ["respiratory_rate_in_cycles_per_minute"]
    },
    {
      predicate: (body_temperature, breathing_difficulty_borg_scale) => {
        return (typeof body_temperature !== 'undefined')
          && body_temperature >= 39.1
          && breathing_difficulty_borg_scale >= 2.0;
      },
      arguments: ["body_temperature", "breathing_difficulty_borg_scale"]
    },
    {
      predicate: (agreed_containment) => {
        return !agreed_containment;
      },
      arguments: ["agreed_containment"]
    },
    {
      predicate: (heavy_comorbidities_count) => {
        return heavy_comorbidities_count >= 1;
      },
      arguments: ["heavy_comorbidities_count"]
    },
  ]
};


/*
 * Red - critical: Patient Covid severe to critical
 * -> immediately redirected to a triage center
 */
const red_rule_set = {
  category: "red",
  mode: "any",
  rules: [
    {
      predicate: (body_temperature, hydratation) => {
        return (typeof body_temperature !== 'undefined')
          && body_temperature > 40.0
          && !hydratation;
      },
      arguments: ["body_temperature", "hydratation"]
    },
    {
      predicate: (body_temperature, age) => {
        return (typeof body_temperature !== 'undefined')
          && body_temperature > 40.0
          && age >= 65;
      },
      arguments: ["body_temperature", "age"]
    },
    {
      predicate: (heartbeats_per_minute) => {
        return (typeof heartbeats_per_minute !== 'undefined') && heartbeats_per_minute > 130;
      },
      arguments: ["heartbeats_per_minute"]
    },
    {
      predicate: (respiratory_rate_in_cycles_per_minute) => {
        return (typeof respiratory_rate_in_cycles_per_minute !== 'undefined')
          && respiratory_rate_in_cycles_per_minute >= 25
          || respiratory_rate_in_cycles_per_minute <= 8;
      },
      arguments: ["respiratory_rate_in_cycles_per_minute"]
    },
    {
      predicate: (consciousness) => {
        return consciousness == 2;
      },
      arguments: ["consciousness"]
    },
    {
      predicate: (spo2) => {
        return (typeof spo2 !== 'undefined') && spo2 < 93;
      },
      arguments: ["spo2"]
    },
    {
      predicate: (age, breathing_difficulty_borg_scale, alone_at_home) => {
        return age >= 65 && breathing_difficulty_borg_scale >= 3.0 && alone_at_home;
      },
      arguments: ["age", "breathing_difficulty_borg_scale", "alone_at_home"]
    },
    {
      predicate: (breathing_difficulty_borg_scale) => {
        return breathing_difficulty_borg_scale >= 5.0;
      },
      arguments: ["breathing_difficulty_borg_scale"]
    },
    {
      predicate: (breathing_difficulty_borg_scale, recent_chest_pain) => {
        return breathing_difficulty_borg_scale >= 3.0 && recent_chest_pain;
      },
      arguments: ["breathing_difficulty_borg_scale", "recent_chest_pain"]
    },
    {
      // Patient with fast worsening of breathing difficulties within 12 hours
      predicate: (previous_breathing_difficulty_borg_scale, breathing_difficulty_borg_scale) => {
        return (breathing_difficulty_borg_scale - previous_breathing_difficulty_borg_scale) > 2.0;
      },
      arguments: ["previous_breathing_difficulty_borg_scale", "breathing_difficulty_borg_scale"]
    },
  ]
};


/*
 * Evaluates the truth value of a rule given the parameters of a patient
 * and complete the patient evaluation according to this value.
 */
let evaluate_rule = (rule_set, current_rule, patient_current_record, patient_evaluation) => {
  let argument_names = [];
  let argument_values = [];

  current_rule.arguments.forEach(argument => {
    if (patient_current_record.parameters.hasOwnProperty(argument)) {
      let argument_value = patient_current_record.parameters[argument];
      argument_values.push(argument_value);
      argument_names.push(argument);
    } else if (argument == "previous_breathing_difficulty_borg_scale") { // if no previous recording of Borg scale
      let argument_value = patient_current_record.parameters["breathing_difficulty_borg_scale"]; // Consider the current value
      argument_values.push(argument_value);
      argument_names.push(argument);
    } else {
      console.log("Parameter '" + argument + "' not found for patient '"
        + patient_current_record.name + "'.");
      return process.exit(-1);
    }
  });

  let truth_result = current_rule.predicate(...argument_values);
  if (truth_result) {
    argument_names.forEach((name, idx) => {
      let evaluation = { value: argument_values[idx], category: rule_set.category }
      patient_evaluation.evaluated_parameters[name] = evaluation;
    });
  }
  return { truth_result: truth_result, patient_evaluation: patient_evaluation };
}


/*
 * Evaluates all the rules of a rule set according to the parameters of
 * a patient and complete the evaluation of the patient with the result.
 */
let evaluate_all_rules = (rule_set, patient_current_record, patient_evaluation) => {
  let global_truth_value;

  if (rule_set.mode == "all") {
    global_truth_value = true;
  } else if (rule_set.mode == "any") {
    global_truth_value = false;
  } else {
    console.log("Unknow rule evaluation mode '"
      + rule_set.mode + "' in rule set of category '"
      + rule_set.category + "'.");
    return process.exit(-1);
  }

  rule_set.rules.forEach((current_rule) => {
    let result = evaluate_rule(rule_set, current_rule, patient_current_record, patient_evaluation);
    if (rule_set.mode == "all") {
      global_truth_value = global_truth_value && result.truth_result;
    } else if (rule_set.mode == "any") {
      global_truth_value = global_truth_value || result.truth_result;
    }
    patient_evaluation = result.patient_evaluation;
  });

  if (global_truth_value) {
    patient_evaluation.global_category = rule_set.category;
  }

  return patient_evaluation;
};


/*
 * Initializes the evaluation of a patient with the global
 * category and all the categories of the parameters
 * as "not_categorized".
 */
let initialize_evaluation = (patient) => {
  let evaluation = {
    name: patient.name,
    global_category: "not_categorized",
    evaluated_parameters: {}
  }
  for (const parameter_name in patient.parameters) {
    evaluation.evaluated_parameters[parameter_name] = {
      value: patient.parameters[parameter_name],
      category: "not_categorized"
    };
  }
  return evaluation;
};


/*
 * Evaluates successively the rule sets corresponding to green,
 * orange and red categories. Each successive evaluation complete
 * additively the global patient evaluation.
 */
let evaluate_all_sets = (patient) => {
  let init_eval = initialize_evaluation(patient);
  let green_eval = evaluate_all_rules(green_rule_set, patient, init_eval);
  let orange_eval = evaluate_all_rules(orange_rule_set, patient, green_eval);
  return evaluate_all_rules(red_rule_set, patient, orange_eval);
};


/*
 * Append a color code to the text according to the risk category.
 * Can be disabled for terminals that do not support color codes.
 */
let append_color_code = (text, category, enabled) => {
  let reset_code = "\x1b[0m";
  if (enabled) {
    let color_code = "";
    switch (category) {
      case "green":
        color_code = "\x1b[32m";
        break;
      case "orange":
        color_code = "\x1b[33m"; // only yellow seems possible
        break;
      case "red":
        color_code = "\x1b[31m";
        break;
      default:
        color_code = "";
    }
    return color_code + text + reset_code;
  } else {
    return text;
  }
};


/*
 * French translation of the categories and values
 */
let translate_category = (category, translated) => {
  let category_text = category + "";
  let translated_category = "";
  if (translated) {
    if (category_text.includes("green")) {
      translated_category = category_text.replace("green", "vert");
    }
    else if (category_text.includes("orange")) {
      translated_category = category_text.replace("orange", "orange"); // same translation
    }
    else if (category_text.includes("red")) {
      translated_category = category_text.replace("red", "rouge");
    }
    else if (category_text.includes("not_categorized")) {
      translated_category = category_text.replace("not_categorized", "non-classifiable");
    }
    else if (category_text.includes("true")) {
      translated_category = category_text.replace("true", "oui");
    }
    else if (category_text.includes("false")) {
      translated_category = category_text.replace("false", "non");
    }
    else {
      translated_category = category_text; // no translation
    }
    return translated_category;
  } else {
    return category_text;
  }
};


/*
 * French translation of the parameters of the patient
 */
let translate_parameter = (parameter_text, translated) => {
  let translated_parameter_text = "";
  if (translated) {
    switch (parameter_text) {
      case "age":
        translated_parameter_text = "âge";
        break;
      case "heavy_comorbidities_count":
        translated_parameter_text = "nombre de comorbidités lourdes";
        break;
      case "body_temperature":
        translated_parameter_text = "température en °C";
        break;
      case "previous_breathing_difficulty_borg_scale":
        translated_parameter_text = "niveau de difficulté respiratoire (échelle de Borg) il y a 12 heures";
        break;
      case "breathing_difficulty_borg_scale":
        translated_parameter_text = "niveau actuel de difficulté respiratoire (échelle de Borg)";
        break;
      case "heartbeats_per_minute":
        translated_parameter_text = "fréquence cardiaque en bpm";
        break;
      case "respiratory_rate_in_cycles_per_minute":
        translated_parameter_text = "fréquence respiratoire en cycles par minute";
        break;
      case "consciousness":
        translated_parameter_text = "niveau de conscience";
        break;
      case "hydratation":
        translated_parameter_text = "hydratation et diurèse correcte";
        break;
      case "spo2":
        translated_parameter_text = "saturation en O2 en %";
        break;
      case "digestive_disorders":
        translated_parameter_text = "présence de diarrhée et/ou vômissements";
        break;
      case "recent_cold_chill":
        translated_parameter_text = "frissons importants ces dernières 12h";
        break;
      case "recent_chest_pain":
        translated_parameter_text = "douleurs thoraciques ressenties ces dernières 12h";
        break;
      case "anosmia_ageusia":
        translated_parameter_text = "anosmie et/ou agueusie";
        break;
      case "alone_at_home":
        translated_parameter_text = "seul à domicile";
        break;
      case "agreed_containment":
        translated_parameter_text = "confinement possible";
        break;
      default:
        translated_parameter_text = parameter_text;
    }
    return translated_parameter_text;
  } else {
    return parameter_text;
  }
};

/*
 * Display a colored or not version of a patient evaluation on the
 * Javascript console.
 * You can disable coloring by setting the colored parameter to 'false'.
 */
let display_evaluation = (evaluation, colored, translated) => {
  console.log("--------------------------------------");
  console.log("Nom du patient: " + evaluation.name);
  console.log("Catégorie de risque global : " + translate_category(append_color_code(
    evaluation.global_category,
    evaluation.global_category,
    colored), translated));
  console.log("Paramètres mesurés: ");
  for (const parameter in evaluation.evaluated_parameters) {
    let value = evaluation.evaluated_parameters[parameter].value;
    if (typeof value == 'undefined') {
      value = "non-mesuré";
    }
    let category = evaluation.evaluated_parameters[parameter].category;
    if (colored) {
      console.log("   " + translate_parameter(parameter, translated) + " = " + translate_category(append_color_code(value, category, colored), translated));
    } else {
      console.log("   " + translate_parameter(parameter, translated) + " = " + translate_category(value, translated) + " : " + translate_category(category, translated));
    }
  }
  console.log("--------------------------------------");
}


/*
 * Test patients data to validate the sets of rules.
 */
const test_data = [
  {
    name: "Patient 1 : tout va bien",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 2 : douleurs thoraciques récentes",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: true,
      recent_cold_chill: false,
      recent_chest_pain: true,
      anosmia_ageusia: true,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 3 : âge >= 65, saturation et frissons",
    parameters: {
      age: 67,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 95,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: true,
      recent_chest_pain: false,
      anosmia_ageusia: true,
      alone_at_home: true,
      agreed_containment: true
    }
  },
  {
    name: "Patient 4 : âge et saturation en orange",
    parameters: {
      age: 67,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 95,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: true,
      anosmia_ageusia: true,
      alone_at_home: true,
      agreed_containment: true
    }
  },
  {
    name: "Patient 5 : présence d'au moins une comorbidité lourde",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 1,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: true,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: true,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 6 : absence de mesure de t° et une majorité de bon paramètres",
    // Check unknown data
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: undefined, // Unknown
      breathing_difficulty_borg_scale: 2.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: true,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: true,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 7 : exemple de paramètres de niveau orange",
    parameters: {
      age: 68,
      heavy_comorbidities_count: 3,
      body_temperature: 39.4,
      breathing_difficulty_borg_scale: 4.0,
      heartbeats_per_minute: 118,
      respiratory_rate_in_cycles_per_minute: 22,
      spo2: 94,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: true,
      recent_cold_chill: true,
      recent_chest_pain: false,
      anosmia_ageusia: true,
      alone_at_home: false,
      agreed_containment: false
    }
  },
  {
    name: "Patient 8 : seul à domicile avec certains paramètres dégradés",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 39.6,
      breathing_difficulty_borg_scale: 2.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: true,
      recent_cold_chill: true,
      recent_chest_pain: false,
      anosmia_ageusia: true,
      alone_at_home: true,
      agreed_containment: true
    }
  },
  {
    name: "Patient 9 : frissons ces dernières 12 heures sans mesure de la température",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: undefined,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: true,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 10 : paramètres en catégorie rouge",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 40.1,
      breathing_difficulty_borg_scale: 6.0,
      heartbeats_per_minute: 135,
      respiratory_rate_in_cycles_per_minute: 26,
      spo2: 92,
      consciousness: 2,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 11 : fréquence respiratoire trop lente",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 7,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 12 : saturation trop basse",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 91,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 13 : patient âgé, seul au domicile avec difficultés respiratoires",
    parameters: {
      age: 68,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 3.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: true,
      agreed_containment: true
    }
  },
  {
    name: "Patient 14 : difficultés respiratoires et douleurs thoraciques",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 3.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: true,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 15 : patient avec un dégradation importante (> 2 paliers) de sa dyspnée sur 12h",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      previous_breathing_difficulty_borg_scale: 1.0,
      breathing_difficulty_borg_scale: 4.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 16 : patient avec un dégradation modérée de sa dyspnée sur 12h",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      previous_breathing_difficulty_borg_scale: 2.0,
      breathing_difficulty_borg_scale: 4.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 17 : patient avec un dégradation modérée de sa dyspnée sur 12h mais avec atteinte du seuil critique de Borg 5",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      previous_breathing_difficulty_borg_scale: 3.0,
      breathing_difficulty_borg_scale: 5.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 18 : un niveau de conscience altéré fait basculer en catégorie rouge",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 2,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 19 : une difficulté à s'hydrater ou une oligurie-anurie font basculer le patient en orange",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: false,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 20 : la température non mesurée n'empêche pas la classification en vert.",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: undefined,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 21 : fréquence cardiaque non-mesurée",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: undefined,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 22 : spo2 non-mesurée",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: undefined,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 23 : fréquence respiratoire non-mesurée",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: undefined,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 24 : âgé avec plus 40°C de fièvre",
    parameters: {
      age: 68,
      heavy_comorbidities_count: 0,
      body_temperature: 40.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 25 : à risque de déshydratation avec plus de 40°C de fièvre",
    parameters: {
      age: 54,
      heavy_comorbidities_count: 0,
      body_temperature: 40.1,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: false,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
  {
    name: "Patient 26 : âgé, à risque de déshydratation avec plus de 40°C de fièvre",
    parameters: {
      age: 66,
      heavy_comorbidities_count: 0,
      body_temperature: 40.1,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 98,
      consciousness: 1,
      hydratation: false,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: false,
      agreed_containment: true
    }
  },
];


/*
 * Main code evaluating all the test patients.
 */
const colored_display = true;
const french_translated = true;

test_data.forEach((patient) => {
  display_evaluation(evaluate_all_sets(patient), colored_display, french_translated);
});