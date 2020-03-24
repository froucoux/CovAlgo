/*
 * A proposition for a categorization algorithm for the at-home follow-up
 * of COVID-19-suspected belgian patients.
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

const green_rule_set = {
  category: "green",
  mode: "all",
  rules: [
    {
      predicate: (body_temperature) => {
        return (typeof body_temperature !== 'undefined') && body_temperature <= 39.0;
      },
      arguments: ["body_temperature"]
    },
    {
      predicate: (recent_cold_chill) => {
        return !recent_cold_chill;
      },
      arguments: ["recent_cold_chill"]
    },
    {
      predicate: (heartbeats_per_minute) => {
        return (typeof heartbeats_per_minute !== 'undefined') && heartbeats_per_minute <= 110;
      },
      arguments: ["heartbeats_per_minute"]
    },
    {
      predicate: (spo2) => {
        return (typeof spo2 !== 'undefined') && spo2 >= 96;
      },
      arguments: ["spo2"]
    },
    {
      predicate: (breathing_difficulty_borg_scale) => {
        return breathing_difficulty_borg_scale <= 1.0;
      },
      arguments: ["breathing_difficulty_borg_scale"]
    },
    {
      predicate: (respiratory_rate_in_cycles_per_minute) => {
        return (typeof respiratory_rate_in_cycles_per_minute !== 'undefined')
          && respiratory_rate_in_cycles_per_minute <= 21;
      },
      arguments: ["respiratory_rate_in_cycles_per_minute"]
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
      predicate: (recent_chest_pain) => {
        return !recent_chest_pain;
      },
      arguments: ["recent_chest_pain"]
    },
    {
      predicate: (heavy_comorbidities_count) => {
        return heavy_comorbidities_count == 0;
      },
      arguments: ["heavy_comorbidities_count"]
    },
  ]
};

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
      predicate: (recent_chest_pain) => {
        return recent_chest_pain;
      },
      arguments: ["recent_chest_pain"]
    },
    {
      predicate: (recent_cold_chill) => {
        return recent_cold_chill;
      },
      arguments: ["recent_cold_chill"]
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
      predicate: (consciousness, alone_at_home) => {
        return consciousness > 1 && alone_at_home;
      },
      arguments: ["consciousness", "alone_at_home"]
    },
    {
      predicate: (hydratation, alone_at_home) => {
        return !hydratation && alone_at_home;
      },
      arguments: ["hydratation", "alone_at_home"]
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

const red_rule_set = {
  category: "red",
  mode: "any",
  rules: [
    {
      predicate: (body_temperature) => {
        return (typeof body_temperature !== 'undefined') && body_temperature > 40.0;
      },
      arguments: ["body_temperature"]
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
        return consciousness > 2;
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
        return breathing_difficulty_borg_scale > 5.0;
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
      predicate: (consciousness, alone_at_home) => {
        return consciousness > 1 && alone_at_home;
      },
      arguments: ["consciousness", "alone_at_home"]
    }
  ]
};


/*
 * Evaluates the truth value of a rule given the parameters of a patient
 * and complete the patient evaluation according to this value.
 */
let evaluate_rule = (rule_set, current_rule, patient, patient_evaluation) => {
  let argument_names = [];
  let argument_values = [];

  current_rule.arguments.forEach(argument => {
    if (patient.parameters.hasOwnProperty(argument)) {
      let argument_value = patient.parameters[argument]; // TODO : check if present
      argument_values.push(argument_value);
      argument_names.push(argument);
    } else {
      console.log("Parameter '" + argument + "' not found for patient '"
        + patient.name + "'.");
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
let evaluate_all_rules = (rule_set, patient, patient_evaluation) => {
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
    let result = evaluate_rule(rule_set, current_rule, patient, patient_evaluation);
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
 * Append an color code to the text according to the risk category.
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
 * Display a colored or not version of a patient evaluation on the
 * Javascript console.
 * You can disable coloring by setting the colored parameter to 'false'.
 */
let display_evaluation = (evaluation, colored) => {
  console.log("--------------------------------------");
  console.log("Patient name: " + evaluation.name);
  console.log("Global risk category: " + append_color_code(
    evaluation.global_category,
    evaluation.global_category,
    colored));
  console.log("Parameters: ");
  for (const parameter in evaluation.evaluated_parameters) {
    let value = evaluation.evaluated_parameters[parameter].value;
    let category = evaluation.evaluated_parameters[parameter].category;
    if (colored) {
      console.log("   " + parameter + " = " + append_color_code(value, category, colored));
    } else {
      console.log("   " + parameter + " = " + value + " : " + category);
    }
  }
  console.log("--------------------------------------");
}

/*
 * Test data to validate the sets of rules.
 */


const test_data = [
  {
    name: "Patient 1",
    parameters: {
      age: 65,
      heavy_comorbidities_count: 0,
      body_temperature: 38.6,
      breathing_difficulty_borg_scale: 1.0,
      heartbeats_per_minute: 92,
      respiratory_rate_in_cycles_per_minute: 20,
      spo2: 92,
      consciousness: 1,
      hydratation: true,
      digestive_disorders: false,
      recent_cold_chill: false,
      recent_chest_pain: false,
      anosmia_ageusia: false,
      alone_at_home: true,
      agreed_containment: true
    }
  }
];


const colored_display = true;

test_data.forEach((patient) => {
  display_evaluation(evaluate_all_sets(patient), colored_display);
});
