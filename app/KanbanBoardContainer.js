import React, {Component} from 'react';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard'
import {polyfill} from 'es6-promise';
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = '../api';

class KanbanBoardContainer extends Component {
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
			console.error('Error fetching and parsing data --', error);
		});
	}
	addTask(cardId, taskName){
		//let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
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
	toggleTask(cardId, taskId, taskIndex){
		let cardIndex = this.state.cards.findIndex((card) => cardId == card.id);
		let newDoneValue;
		let nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {
					[taskIndex]: {
						done: { $apply: (done) => {
							newDoneValue = !done;
							return newDoneValue;
						}}
					}
				}
			}
		});
		this.setState({ cards: nextState });
		fetch(`${API_URL}/cards/${cardIndex}/tasks/${taskIndex}`, {
			method: 'put',
			body: JSON.stringify({ done: newDoneValue })
		});
	}
	render(){
		return (
			<KanbanBoard
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

export default KanbanBoardContainer;
