import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, IndexRoute, browserHistory, useRouterHistory} from 'react-router';
import {createHistory} from "history";

import KanbanBoardContainer from './KanbanBoard/KanbanBoardContainer';
import ContactsAppContainer from './Contacts/ContactsApp';
import AnimatedShoppingList from './ShoppingList/AnimatedShoppingList';
import Home from './Home';
import About from './About';
import Repos from './Repos/Repos';
import ReposDetails from './Repos/ReposDetails';
import ServerError from './ServerError';

import './style.less';
import './AppStyle.less';
import './KanbanBoard/KanbanBoardStyle.less'
import './AppStyle.less';
import './ShoppingList/AnimatedShoppingListStyle.less';

class App extends Component {
	render(){
		return (
			<div id="app">
				<header>App</header>
				<menu>
					<ul>
						<li><Link to="/home" activeClassName="active">Home</Link></li>
						<li><Link to="/about" activeClassName="active">About</Link></li>
						<li><Link to="/repos" activeClassName="active">Repos</Link></li>
						<li><Link to="/kanbanboard" activeClassName="active">Kanban Board</Link></li>
						<li><Link to="/contacts" activeClassName="active">Contacts</Link></li>
						<li><Link to="/shoppinglist" activeClassName="active">Shopping List</Link></li>
					</ul>
				</menu>
				{this.props.children}
			</div>
		);
	}
}

const history = useRouterHistory(createHistory)({
	basename: "/my-project/sample-project/build"
});

render((
	<Router history={history}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="home" component={Home} />
			<Route path="about" component={About} title="About Us" />
			<Route path="repos" component={Repos}>
				<Route path=":repo_name" component={ReposDetails} />
			</Route>
			<Route path="kanbanboard" component={KanbanBoardContainer} />
			<Route path="contacts" component={ContactsAppContainer} />
			<Route path="shoppinglist" component={AnimatedShoppingList} />
			<Route path="error" component={ServerError} />
		</Route>
	</Router>
	), document.getElementById('root')
);
