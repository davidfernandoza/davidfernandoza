module.exports = {
	"extends": "jquery",
	"env": {
		"es6": true,
		"browser": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"never"
		]
	}
}
