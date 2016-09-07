import React, { Component } from 'react';
import { render } from 'react-dom';
import cardsList from './cardsList.json';
import KanbanBorad from './KanbanBorad.js';
import './style.less';

render(<KanbanBorad cards={ cardsList } />, document.getElementById('main'));
