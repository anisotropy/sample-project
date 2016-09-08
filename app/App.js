import React, { Component } from 'react';
import { render } from 'react-dom';
import cardsList from './cardsList.json';
import contacts from './contacts.json';
import KanbanBorad from './KanbanBorad';
import ContactsApp from './ContactsApp';
import './style.less';

render(
	<div>
		<KanbanBorad cards={cardsList} />
		<ContactsApp contacts={contacts} />
	</div>,
	document.getElementById('root')
);
