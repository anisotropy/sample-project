import React, { Component } from 'react';

class CheckList extends Component {
	render(){
		let tasks = this.props.tasks.map((task) => (
			<li className="checklist__task">
				<input type="checkbox" defaultChecked={ task.done } value />
				{ task.name }
				<a href="#" className="checklist__task--remove" />
			</li>
		));
		return(
			<div className="checkList">
				<ul>{ tasks }</ul>
			</div>
		);
	}
}

export default CheckList;
