import React, {Component, PropTypes} from 'react';
import List from './List.js';

class KanbanBorad extends Component {
	render(){
		return (
			<div className="app">
				<List id="todo" title="To Do"
					cards={this.props.cards.filter((card) => card.status === 'todo')}
					taskCallbacks = {this.props.taskCallbacks}
				/>
				<List id="in-progress" title="In Progress"
					cards={this.props.cards.filter((card) => card.status === 'in-progress')}
					taskCallbacks = {this.props.taskCallbacks}
				/>
				<List id="done" title="Done"
					cards={this.props.cards.filter((card) => card.status === 'done')}
					taskCallbacks = {this.props.taskCallbacks}
				/>
			</div>
		);
	}
}
KanbanBorad.propTypes = {
	cards: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object
};

export default KanbanBorad;
