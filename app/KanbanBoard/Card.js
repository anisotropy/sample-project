import React, {Component, PropTypes} from 'react';
import CheckList from './CheckList';
import marked from 'marked';

let titlePropTypes = (props, propName, componentName) => {
	if(props[propName]){
		let value = props[propName];
		if(typeof value !== 'string' || value.length > 80){
			return new Error(`${propName} in ${componentName} is longer than 80 characters`);
		}
	}
}

class Card extends Component {
	constructor(){
		super();
		this.state = {
			showDetails: false
		}
	}
	toggleDetails(){
		this.setState({ showDetails: !this.state.showDetails });
	}
	render(){
		let cardDetails;

		let renderer = new marked.Renderer();
		renderer.paragraph = (string) => { return string; }

		let sideColor = {
			position: 'absolute',
			zIndex: -1,
			top: 0,
			bottom: 0,
			left: 0,
			width: 7,
			backgroundColor: this.props.color
		};

		if(this.state.showDetails){
			cardDetails = (
				<div className="card__details">
					<span dangerouslySetInnerHTML={{__html:marked(this.props.description, {renderer: renderer})}} />
					<CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
				</div>
			);
		}
		return(
			<div className="card">
				<div style={sideColor} />
				<div className={this.state.showDetails ? 'card__title card__title--is-open' : 'card__title'}
					onClick={this.toggleDetails.bind(this)}
				>{this.props.title}</div>
				{cardDetails}
			</div>
		);
	}
}
Card.propTypes = {
	id: PropTypes.number,
	title: titlePropTypes,
	description: PropTypes.string,
	color: PropTypes.string,
	tasks: PropTypes.arrayOf(PropTypes.object),
	taskCallbacks: PropTypes.object
};

export default Card;
