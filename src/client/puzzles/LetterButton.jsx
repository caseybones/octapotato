'use strict';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export const LETTER_WIDTH = 39;
export const LETTER_HEIGHT = 39;
export const LETTER_MARGIN = 3;

export default class LetterButton extends React.Component {

    constructor(props) {
        super(props);
        this.letter = props.letter;
        this.id = props.id;
        this.disabled = props.disabled;
        this.clickHandler = props.clickHandler;
        this.click = this.click.bind(this);
    }

    style() {
        return {
            minWidth: LETTER_WIDTH,
            width: LETTER_WIDTH,
            height: LETTER_HEIGHT,
            margin: LETTER_MARGIN
        }
    }

    click() {
        this.clickHandler(this.id);
    }

    render() {
        return (
            <RaisedButton primary style={this.style()} onClick={this.click} label={this.letter} />
        );
    }
}

