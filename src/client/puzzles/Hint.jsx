'use strict';

import React from 'react';
import { observer } from 'mobx-react';

const style = {
    heading: {
        color: '#9E9E9E',
    },
    hintArea: {
        height: 50,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 3,
        marginRight: 3,
        color: '#4FC3F7',
    }
}

@observer
export default class Hint extends React.Component {
    constructor(props) {
        super(props);
        this.text = props.children;
    }

    render() {
        return (
            <div id='letter-set'>
                <div>
                    <text style={style.heading}>
                        <small> Hint </small>
                    </text>
                </div>
                <div style={style.hintArea}>
                    <text> {this.text} </text>
                </div>
            </div>
        );
    }
}