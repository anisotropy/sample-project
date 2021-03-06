import React, {Component} from 'react';
import update from 'react-addons-update';
import KanbanBoard from './KanbanBoard'
import {polyfill} from 'es6-promise'; // for fetch()
import 'whatwg-fetch'; // for fetch()
import 'babel-polyfill'; // for update() ...

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
			console.error(error);
		});
	}
	addTask(cardId, taskName){
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		let newTask = {
			id: Date.now(),
			name: taskName,
			done: false
		}
		let newState = update(this.state.cards, {
			[cardIndex]: {
				tasks: { $push: [newTask] }
			}
		});
		this.setState({ cards: newState });
		fetch(`${API_URL}/cards/${cardId}/tasks`, {
			method: 'post',
			body: JSON.stringify(newTask)
		})
		.then((response) => {
			if(response.ok){
				return response.json();
			} else {
				throw new Error('Server response was not OK');
			}
		})
		.then((responseData) => {
			newTask.id = responseData.id;
			this.setState({ cards: newState });
		})
		.catch((error) => {
			console.error(error);
			this.setState(prevState);
		});
	}
	deleteTask(cardId, taskId, taskIndex){
		let prevState = this.state;
		let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
		let nextState = update(this.state.cards, {
			[cardIndex]: {
				tasks: {$splice: [[taskIndex, 1]]}
			}
		});
		this.setState({cards: nextState});
		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: 'delete'
		})
		.then((response) => {
			if(!response.ok){
				throw new Error('Server response was not OK');
			}
		})
		.catch((error) => {
			console.error(error);
			this.setState(prevState);
		});

	}
	toggleTask(cardId, taskId, taskIndex){
		let prevState = this.state;
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
		fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
			method: 'put',
			body: JSON.stringify({ done: newDoneValue })
		})
		.then((response) => {
			if(!response.ok){
				throw new Error('Server response was not OK');
			}
		})
		.catch((error) => {
			console.error(error);
			this.setState(prevState);
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
