import $ from './contrib/jquery/jquery-2.2.1.min.js';
import React from 'react';
import ReactDom, {render} from 'react-dom';
import CommentBox from './CommentBox';

import './style.less';

render(
	<CommentBox url="comments" pollInterval={2000} />,
	document.getElementById('content')
);
