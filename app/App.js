import React, { Component } from 'react';
import { render } from 'react-dom';
import cardsList from './cardsList.json';
import KanbanBorad from './KanbanBorad';
import ContactsAppContainer from './ContactsApp';
import './style.less';

render(
	<div>
		<KanbanBorad cards={cardsList} />
		<ContactsAppContainer />
	</div>,
	document.getElementById('root')
);
