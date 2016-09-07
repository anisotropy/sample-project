var entry = [
	'/app/App.js'
];

var globalModules = {
};

module.exports = {
	entry: entry.map(function(item){ return __dirname+item; }),
	globalModules: globalModules
};
