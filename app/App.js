import React, { Component } from 'react';
import { render } from 'react-dom';
import KanbanBoardContainer from './KanbanBoardContainer';
import ContactsAppContainer from './ContactsApp';
import './style.less';

render(
	<div>
		<KanbanBoardContainer />
		<ContactsAppContainer />
	</div>,
	document.getElementById('root')
);
