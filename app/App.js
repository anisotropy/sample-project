import React, { Component } from 'react';
import { render } from 'react-dom';
import KanbanBoradContainer from './KanbanBoradContainer';
import ContactsAppContainer from './ContactsApp';
import './style.less';

render(
	<div>
		<KanbanBoradContainer />
		<ContactsAppContainer />
	</div>,
	document.getElementById('root')
);
