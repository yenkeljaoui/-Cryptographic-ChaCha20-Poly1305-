try {
	module.exports = require('chacha-native');
} catch (_) {
	module.exports = require('./browser');

}
console.log("🔥 index.js loaded!");

