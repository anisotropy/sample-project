import React, {createClass} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from './contrib/jquery/jquery-2.2.1.min.js';

var CommentBox = createClass({
	loadCommentsFromServer(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState(){
		return {data: []};
	},
	handleCommentSubmit(comment){
		var comments = this.state.data;
		comment.id = comments.length;
		var newComments = comments.concat([comment]);
		this.setState({data: newComments});
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	componentDidMount(){
		this.loadCommentsFromServer();
		setInterval(function(){
			this.loadCommentsFromServer();
		}.bind(this), 2000);
	},
	render(){
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});

export default CommentBox;
