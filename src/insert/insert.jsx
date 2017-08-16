import React, {Component} from 'react';
import * as Database from '../Database';
import './insert.css';

class Insert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            color: '',
            cape: false
        };
        this.subs = [];
        this.addHero = this.addHero.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleCapeChange = this.handleCapeChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentWillMount () {
        this.id = `toggle_${Math.random().toString().replace(/0\./, '')}`;
    }
    componentDidMount() {
    }
    componentWillUnmount() {}

    async addHero() {
        const {name, color, cape} = this.state;
        const db = await Database.get();
        db.heroes.insert({name, color, cape});
        this.setState({name: '', color: '', cape: false});
    }
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleColorChange(event) {
        this.setState({color: event.target.value});
    }
    handleCapeChange(event) {
        this.setState({cape: !this.state.cape});
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter')
            return;
        this.addHero();
    }
    render() {
        return (
            <div id="insert-box" className="box">
                <h3>Add Hero</h3>
                <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} onKeyPress={this.handleKeyPress}/>
                <input type="text" placeholder="Color" value={this.state.color} onChange={this.handleColorChange} onKeyPress={this.handleKeyPress}/>
                <input type="checkbox" value={this.state.cape} onChange={this.handleCapeChange} onKeyPress={this.handleKeyPress}/>
                <label htmlFor={this.id}>Label</label>
                <button onClick={this.addHero}>Insert a Hero</button>
            </div>
        );
    }
}


export default Insert;
