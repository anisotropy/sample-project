import React, {createClass} from 'react';

var Comment = createClass({
	render(){
		return (
			<div className='comment'>
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		);
	}
});

export default Comment;
