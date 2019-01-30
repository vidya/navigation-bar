import React from 'react';

import './NavigationBar.scss';

import data from "../Data/navigation.json";

function City({ cityClass, section, label }) {
    return (
        <span>
            <a className={cityClass} data-section={section}> {label} </a>
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
            cities: {},
            selectedSection: '',
        }

        this.cityClick = this.cityClick.bind(this)
    }

    componentDidMount() {
        const cityList = data['cities']

        // cityList:
        //
        //     [
        //         {
        //             "section": "cupertino",
        //             "label": "Cupertino",
        //         },
        //         ...
        //     ]

        const cities = {}

        cityList.forEach(({ section, label }) => {
            cities[section] = {
                section,
                label,
                cityClass: 'city',
            }
        })

        this.setState({ cities })
    }

    cityClick({ target: {dataset: { section }} }) {
        if ((typeof section === "undefined") || (section === null)) {
            return
        }

        const { cities } = this.state
        let selectedSection  = this.state.selectedSection

        if (selectedSection !== '') {
            cities[selectedSection].cityClass = 'city'
        }

        selectedSection = section
        cities[selectedSection].cityClass = 'selectedCity'

        this.setState({
            cities,
            selectedSection
        })
    }

    render() {
        const { cities } = this.state

        const listItems = Object.values(cities).map(({ section, label, cityClass }, n) => (
            <li key={n}>
                <City
                    section={section}
                    label={label}

                    cityClass={cityClass}
                />
            </li>
        ))

        return (
            <div>
                <ul onClick={this.cityClick}>
                    { listItems }
                </ul>

                <hr />
            </div>
        )
    }
}

