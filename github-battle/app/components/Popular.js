import React from 'react';

export default class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: 'All',
        };
    }

    updateLanguage(lang) {
        this.setState(() => {
            return {selectedLanguage: lang};
        });
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <ul className='languages'>
                {languages.map(lang => {
                    return (
                        <li
                            className={lang === this.state.selectedLanguage ? 'active' : ''}
                            onClick={this.updateLanguage.bind(this, lang)}
                            key={lang}>
                            {lang}
                        </li>
                    )
                })}
            </ul>
        )
    }
}
