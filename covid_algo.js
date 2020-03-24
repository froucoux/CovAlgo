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
        return (typeof respiratory_rate_in_cycles_per_minute !== 'undefined') && respiratory_rate_in_cycles_per_minute <= 21;
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
      predicate: (consiousness) => {
        return consiousness == 1;
      },
      arguments: ["consiousness"]
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
      predicate: (consiousness, alone_at_home) => {
        return consiousness > 1 && alone_at_home;
      },
      arguments: ["consiousness", "alone_at_home"]
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
        return (typeof respiratory_rate_in_cycles_per_minute !== 'undefined') && respiratory_rate_in_cycles_per_minute >= 22;
      },
      arguments: ["respiratory_rate_in_cycles_per_minute"]
    },
    {
      predicate: (body_temperature, breathing_difficulty_borg_scale) => {
        return (typeof body_temperature !== 'undefined') && body_temperature >= 39.1 && breathing_difficulty_borg_scale >= 2.0;
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
        return (typeof respiratory_rate_in_cycles_per_minute !== 'undefined') && respiratory_rate_in_cycles_per_minute >= 25 || respiratory_rate_in_cycles_per_minute <= 8;
      },
      arguments: ["respiratory_rate_in_cycles_per_minute"]
    },
    {
      predicate: (consiousness) => {
        return consiousness > 2;
      },
      arguments: ["consiousness"]
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
      predicate: (consiousness, alone_at_home) => {
        return consiousness > 1 && alone_at_home;
      },
      arguments: ["consiousness", "alone_at_home"]
    }
  ]
};


// Checks the truth of a rule given the parameters of a patient
// and complete the patient evaluation.
// TODO : rename patient to patient_parameters.
let evaluate_rule = (rule_set, current_rule, patient, patient_evaluation) => {
  let argument_names = [];
  let argument_values = [];
  current_rule.arguments.forEach(argument => {
    let argument_value = patient.parameters[argument]; // TODO : check if present
    argument_values.push(argument_value);
    argument_names.push(argument);
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


// Verify that all the rules of a rule set are true.
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

let evaluate_all_sets = () => {

};

/*
 * Initializes the evaluation of a patient with the global
 * and all categories of the parameters as "not_categorized".
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

let display_evaluation = (evaluation_name) => {

}

/*
 * Test data
 */

const patient_1 = {
  name: "Patient 1",
  parameters: {
    age: 65,
    heavy_comorbidities_count: 0,
    body_temperature: 38.6,
    breathing_difficulty_borg_scale: 1.0,
    heartbeats_per_minute: 92,
    respiratory_rate_in_cycles_per_minute: 20,
    spo2: 92,
    consiousness: 1,
    hydratation: true,
    digestive_disorders: false,
    recent_cold_chill: false,
    recent_chest_pain: false,
    anosmia_ageusia: false,
    alone_at_home: true,
    agreed_containment: true
  }
}

let init_eval = initialize_evaluation(patient_1);
let eval1 = evaluate_all_rules(green_rule_set, patient_1, init_eval);
console.log(eval1);
let eval2 = evaluate_all_rules(orange_rule_set, patient_1, eval1);
console.log(eval2);
let eval3 = evaluate_all_rules(red_rule_set, patient_1, eval2);
console.log(eval3);