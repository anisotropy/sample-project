require('./style.less');

var CommentBox = require('./CommentBox.js');
ReactDOM.render(
	<CommentBox url="../api/comments" pollInterval={2000} />,
	$('#content').get(0)
);

require('./script.js');
