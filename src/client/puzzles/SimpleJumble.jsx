'use strict';

import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import LetterSet from './LetterSet';
import AnswerSet from './AnswerSet'
import Hint from './Hint';
import { observable } from 'mobx';

const style = {
  card: {
    width: 400,
  },
  header: {
    color: '#006064',
    padding: 5,
    fontSize: '110%'
  },
  cardContent: {
  },
  cardActions: {
    textAlign: 'right'
  },
  submitButton: {
    padding: 5
  }
};

export default class SimpleJumble extends React.Component {
  @observable answerSet = [];
  @observable letterSet = [];

  constructor(props) {
    super(props);
    this.letterSet = props.letters;
    this.hint = props.hint;
    this.answerSet = [];
    this.moveToAnswerSet = this.moveToAnswerSet.bind(this);
    this.moveToLetterSet = this.moveToLetterSet.bind(this);
  }

  moveToAnswerSet(letterIndex) {
    this.answerSet.push(this.letterSet[letterIndex]);
    this.letterSet.splice(letterIndex, 1);
  }

  moveToLetterSet(letterIndex) {
    console.log("moving: " + this.answerSet[letterIndex]);
    this.letterSet.push(this.answerSet[letterIndex]);
    this.answerSet.splice(letterIndex, 1);
  }

  render() {

    return (
      <Card style={style.card}>
        <CardHeader title="Word Jumble" />
        <CardText style={style.cardContent}>
          <Hint>{this.hint}</Hint>
          <LetterSet letters={this.letterSet} onLetterClick={this.moveToAnswerSet} />
          <AnswerSet letters={this.answerSet} onLetterClick={this.moveToLetterSet} />
        </CardText>
        <CardActions style={style.cardActions}>
          <RaisedButton secondary label="Submit (1 token)" />
        </CardActions>
      </Card>
    );
  }

}
