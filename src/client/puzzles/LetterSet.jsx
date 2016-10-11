'use strict';

import React from 'react';
import LetterButton from './LetterButton';
import { observer } from 'mobx-react';
import '../util/Math';

const style = {
    heading: {
        color: '#9E9E9E',
    },
    letterSet: {
        height: 50,
        marginTop: 5,
        marginBottom: 10,
    }
}

@observer
export default class LetterSet extends React.Component {
    constructor(props) {
        super(props);
        this.letters = props.letters;
        this.onLetterClick = props.onLetterClick;
    }

    render() {
        return (
            <div id='letter-set'>
                <div>
                    <text style={style.heading}>
                        <small> Letters </small>
                    </text>
                </div>
                <div style={style.letterSet}>
                    {
                        this.letters.map(function (letter, i) {
                            return <LetterButton key={Math.uuid()} id={i} letter={letter} clickHandler={this.onLetterClick} />
                        }, this)
                    }
                </div>
            </div>
        );
    }
}