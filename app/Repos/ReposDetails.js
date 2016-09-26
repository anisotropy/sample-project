import React, {Component} from 'react';
import {polyfill} from 'es6-promise'; // for fetch()
import 'whatwg-fetch'; // for fetch()

class ReposDetails extends Component {
	/*
	constructor(){
		super(...arguments);
		this.state = {
			repository: {}
		};
	}
	fetchData(repo_name){
		fetch('https://api.github.com/repos/pro-react/'+repo_name)
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({ repository: responseData });
		});
	}
	componentDidMount(){
		let repo_name = this.props.params.repo_name;
		this.fetchData(repo_name);
	}
	componentWillReceiveProps(nextProps){
		let repo_name = nextProps.params.repo_name;
		this.fetchData(repo_name);
	}
	*/
	renderRepository(){
		let repository = this.props.repositories.find((repo) => repo.name === this.props.params.repo_name);
		let stars = [];
		for(var i = 0; i < repository.stargazers_count; i++){
			stars.push('*');
		}
		return(
			<div>
				<h2>{repository.name}</h2>
				<p>{repository.description}</p>
				<span>{stars}</span>
			</div>
		);
	}
	render(){
		if(this.props.repositories.length > 0){
			return this.renderRepository();
		} else {
			return <h4>Loading...</h4>;
		}
	}
}

export default ReposDetails;
