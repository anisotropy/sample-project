import React, {createClass} from 'react';

var CommentForm = createClass({
	getInitialState(){
		return {author: '', text: ''};
	},
	handleAuthorChange(e){
		this.setState({author: e.target.value});
	},
	handleTextChange(e){
		this.setState({text: e.target.value});
	},
	handleSubmit(e){
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if(!author || !text){
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({author: '', text: ''});
		return;
	},
	render(){
		return(
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<div>
					<input type="text" placeholder="name" value={this.state.author} onChange={this.handleAuthorChange} />
				</div>
				<div>
					<input type="text" placeholder="Input something..." value={this.state.text} onChange={this.handleTextChange} />
				</div>
				<div>
					<input type="submit" value="Post" />
				</div>
			</form>
		);
	}
});

export default CommentForm;
