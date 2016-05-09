module.exports = {
    "env": {
      "es6": true,
      "node": true
    },
    "extends": "standard",
    "plugins": [
        "standard"
    ],
    "parserOptions": {
        "ecmaVersion": 6,       // ES2015(ES6) の構文はここに集約
        "sourceType": "module", // Modules の指定だけは分離
        "ecmaFeatures": {       // ECMAScript に含まれない仕様はここ
            "jsx": true
        }
    }
};