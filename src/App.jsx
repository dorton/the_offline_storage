import React, {Component} from 'react';
import './App.css';

import List from './list/list';
import Insert from './insert/insert';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    componentWillUnmount() {}

    render() {
        return (
            <div>
                <h1>Most Heros Have Capes</h1>
                <List/>
                <Insert/>
            </div>
        );
    }
}

export default App;
