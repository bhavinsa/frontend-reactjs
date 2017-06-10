import React, { Component } from 'react';
import { render } from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Main from './common/main.component.jsx'
import About from './common/about.component.jsx'
import Add from './product/add.component.jsx'
import List from './product/list.component.jsx'
import Edit from './product/edit.component.jsx'


render(
    <Router history={browserHistory}>
        <Route component={Main}>
            {/* Parameter route*/}
            <Route path="/" component={About}/>
            <Route path="/add" component={Add}/>
            <Route path="/list" component={List}/>
            <Route path="/edit/:id" component={Edit} />
        </Route>
    </Router>,
    document.getElementById('container')
);
