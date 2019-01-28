import React from 'react';

import './NavigationBar.scss';

import data from "../Data/navigation.json";

function City({ cityClass, cityClick, label }) {
    return (
        <span>
            <a className={cityClass} onClick={cityClick}> {label} </a>
        </span>
    )
}

// Assumption:
//      all the cities in the given list can be listed
//      on a single line on the web page

export class NavigationBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cities: [],
        }

        this.cityClick = this.cityClick.bind(this)
    }

    componentDidMount() {
        const cities = data['cities']

        // cities:
        //
        //     [
        //         {
        //             "section": "cupertino",
        //             "label": "Cupertino",
        //         },
        //         ...
        //     ]

        cities.forEach(c => c.cityClass = 'city')

        this.setState({ cities })
    }

    cityClick(event) {
        const { cities } = this.state

        const clickedCity = event.currentTarget.innerHTML.trim()

        cities.forEach(c => c.cityClass = (c.label == clickedCity) ? 'selectedCity' : 'city')

        this.setState({ cities })
    }

    render() {
        const { cities } = this.state
        const cityClick = this.cityClick

        const listItems = cities.map(({ section, label, cityClass }, n) => (
            <li key={n}>
                <City
                    section={section}
                    label={label}

                    cityClass={cityClass}
                    cityClick={cityClick}
                />
            </li>
        ))

        return (
            <div>
                <ul>
                    { listItems }
                </ul>

                <hr />
            </div>
        )
    }
}

