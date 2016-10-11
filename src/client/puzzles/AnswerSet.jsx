'use strict';

import React from 'react';
import LetterButton from './LetterButton';
import { observer } from 'mobx-react';
import '../util/Math';

const style = {
    heading: {
        color: '#9E9E9E',
    },
    answerSet: {
        height: 50,
        marginTop: 5,
        marginBottom: 10,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#9E9E9E',
    }
}

@observer
export default class AnswerSet extends React.Component {
    constructor(props) {
        super(props);
        this.letters = props.letters;
        this.onLetterClick = props.onLetterClick;
    }

    render() {
        return (
            <div id='answer-set' style={style}>
                <div>
                    <text style={style.heading}>
                        <small> Answer </small>
                    </text>
                </div>
                <div style={style.answerSet}>
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