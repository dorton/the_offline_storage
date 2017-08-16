import React, {Component} from 'react';
import * as Database from '../Database';
import './list.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroesWithCapes: [],
            heroesWithoutCapes: []
        };
        this.capesubs = [];
        this.nocapesubs = [];
        this.editHero = this.editHero.bind(this);
        this.deleteHero = this.deleteHero.bind(this);
    }
    async componentDidMount() {
        const db = await Database.get();

        const capesub = db.heroes.find().where('cape').eq(true).sort({name: 1}).$.subscribe(heroes => {
            if (!heroes)
                return;
            console.log('reload heroes-list ');
            console.dir(heroes);
            this.setState({heroesWithCapes: heroes});
        });
        const nocapesub = db.heroes.find().where('cape').eq(false).sort({name: 1}).$.subscribe(heroes => {
            if (!heroes)
                return;
            console.log('reload heroes-list ');
            console.dir(heroes);
            this.setState({heroesWithoutCapes: heroes});
        });
        this.capesubs.push(capesub);
        this.nocapesubs.push(nocapesub);
    }
    componentWillUnmount() {
        this.capesubs.forEach(capesub => capesub.unsubscribe());
        this.nocapesubs.forEach(nocapesub => nocapesub.unsubscribe());
    }

    async deleteHero(hero) {
        console.log('delete hero:');
        console.dir(hero);
    }
    async editHero(hero) {}

    render() {
        return (
            <div id="list-box" className="box">
                <h3>Heroes w/ Capes</h3>
                <ul id="heroes-list">
                    {this.state.heroesWithCapes.length === 0 && <span>No Hereos Yet</span>}
                    {this.state.heroesWithCapes.map(hero => {
                        return (
                            <li key={hero.name}>
                                <div className="color-box" style={{
                                    background: hero.color
                                }}></div>
                                <span className="name">
                                    {hero.name}
                                </span>
                          </li>
                        );
                    })}
                </ul>
                <h3>Heroes w/o Capes</h3>
                <ul id="heroes-list">
                    {this.state.heroesWithoutCapes.length === 0 && <span>No Hereos Yet</span>}
                    {this.state.heroesWithoutCapes.map(hero => {
                        return (
                            <li key={hero.name}>
                                <div className="color-box" style={{
                                    background: hero.color
                                }}></div>
                                <span className="name">
                                    {hero.name}
                                </span>
                          </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default List;
