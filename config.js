var entry = [
	'/app/content.js'
]

var globalModules = {
	$: 'jquery',
	jQuery: 'jquery',
	React: 'react',
	ReactDOM: 'react-dom',
	Contrib: __dirname+'/app/contrib.js'
}

module.exports = {
	entry: entry.map(function(item){ return __dirname+item; }),
	globalModules: globalModules
}
