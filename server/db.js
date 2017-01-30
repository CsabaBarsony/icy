'use strict';

//const mysql        = require('mysql');
const Nutrient     = require('./food').Nutrient;
const NutrientType = require('./food').NutrientType;
const Food         = require('./food').Food;

/*const usdaDb = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: '',
    database: 'usda_nutrient'
});

const userDb = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: '',
    database: 'nutrit_user'
});*/

const queries = {
    getAllFoods: function() {
        return 'select enabled_food.id, enabled_food.name, nutrient.value '
             + 'from food join enabled_food on food.id = enabled_food.food_id '
             + 'join nutrient on food.id = nutrient.food_id '
             + 'where nutrient.nutrient_id = 203 '
             + 'or nutrient.nutrient_id = 204 '
             + 'or nutrient.nutrient_id = 205';
    }
};

let foods = [];

const tempFoods = [{"id":"1","name":"cheese","nutrients":[{"type":"protein","amount":22.87},{"type":"fat","amount":33.31},{"type":"carbohydrate","amount":3.09}],"description":"","portion":null},{"id":"2","name":"cheese, edam","nutrients":[{"type":"protein","amount":24.99},{"type":"fat","amount":27.8},{"type":"carbohydrate","amount":1.43}],"description":"","portion":null},{"id":"3","name":"cheese, mozzarella","nutrients":[{"type":"protein","amount":21.6},{"type":"fat","amount":24.64},{"type":"carbohydrate","amount":2.47}],"description":"","portion":null},{"id":"4","name":"cheese, parmesan","nutrients":[{"type":"protein","amount":35.75},{"type":"fat","amount":25.83},{"type":"carbohydrate","amount":3.22}],"description":"","portion":null},{"id":"5","name":"fish, herring","nutrients":[{"type":"protein","amount":16.39},{"type":"fat","amount":13.88},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"6","name":"fish, mackerel","nutrients":[{"type":"protein","amount":18.6},{"type":"fat","amount":13.89},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"7","name":"fish, tuna","nutrients":[{"type":"protein","amount":23.33},{"type":"fat","amount":4.9},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"9","name":"cocoa butter oil","nutrients":[{"type":"protein","amount":0},{"type":"fat","amount":100},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"10","name":"sunflower oil","nutrients":[{"type":"protein","amount":0},{"type":"fat","amount":100},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"11","name":"fat, duck","nutrients":[{"type":"protein","amount":0},{"type":"fat","amount":99.8},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"12","name":"fat, goose","nutrients":[{"type":"protein","amount":0},{"type":"fat","amount":99.8},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"13","name":"margarine","nutrients":[{"type":"protein","amount":0.16},{"type":"fat","amount":80.71},{"type":"carbohydrate","amount":0.7}],"description":"","portion":null}];

//usdaDb.connect();

/*usdaDb.query(queries.getAllFoods(), (error, rows) => {
    for(let i = 0; i < rows.length; ) {
        let id   = rows[i].id.toString();
        let name = rows[i].name;
        let p    = rows[i++].value;
        let f    = rows[i++].value;
        let c    = rows[i++].value;

        let nutrients = [
            new Nutrient(NutrientType.PROTEIN,      p),
            new Nutrient(NutrientType.FAT,          f),
            new Nutrient(NutrientType.CARBOHYDRATE, c)
        ];
        let food = new Food(id, name, nutrients);

        foods.push(food);
    }
});*/

// Temporary solution!
foods = tempFoods;

module.exports = {
    /**
     * @returns {Food[]}
     */
    getAllFoods: function() {
        return foods;
    },
    
    /**
     * Sync.
     * @param {String} id
     * @returns {Food}
     */
    getFood: function(id) {
        return foods.find(food => {
            return food.id === id;
        });
    },

    /**
     * @param {String} text
     * @returns {Food[]}
     */
    queryFood: function(text) {
        const results = [];
        foods.forEach(f => {
            if(new RegExp('^' + text, 'gi').test(f.name)) results.push(f);
        });
        return results;
    }
};
