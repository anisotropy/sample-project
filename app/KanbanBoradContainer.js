import React, {Component} from 'react';
import update from 'react-addons-update';
import KanbanBorad from './KanbanBorad'
import {polyfill} from 'es6-promise';
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = '../api';

class KanbanBoradContainer extends Component {
	constructor(){
		super();
		this.state = {
			cards: []
		};
	}
	componentDidMount(){
		fetch(API_URL+'/cards')
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({ cards: responseData })
		})
		.catch((error) => {
			console.error('Error fetching and parsing data', error);
		});
	}
	addTask(cardId, taskName){
		console.log('add a task');
	}
	deleteTask(cardId, taskId, taskIndex){
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		let nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {$splice: [[taskIndex, 1]]}
			}
		});
		this.setState({cards: nextState});
		fetch(`${API_URL}/cards/${cardIndex}/tasks/${taskIndex}`, {
			method: 'delete'
		});

	}
	toggleTask(cardId, taskId, taskName){
		console.log('toggle task');
	}
	render(){
		return (
			<KanbanBorad
				cards={this.state.cards}
				taskCallbacks={{
					toggle: this.toggleTask.bind(this),
					delete: this.deleteTask.bind(this),
				 	add: this.addTask.bind(this)
				}}
			/>
		)
	}
}

export default KanbanBoradContainer;
