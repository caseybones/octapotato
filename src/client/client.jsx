'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SimpleJumble from './puzzles/SimpleJumble';
import './util/Shuffle';
import JQuery from 'jquery';

console.log("Executing client jsx");

const style = {
  fontFamily: 'Roboto',
  background: '#FBFBFB',
  padding: 10
}

injectTapEventPlugin();

JQuery.getJSON("/words/random", function (json) {
  var letters = json.word.toUpperCase().split("").shuffle();
  console.log(letters);
  var hint = json.hint;

  ReactDOM.render(
    <MuiThemeProvider>
      <div style={style}>
        <FlatButton label="Login" />
        <SimpleJumble letters={letters} hint={hint} onclick="window.location.href='/googleauth'" />
      </div>
    </MuiThemeProvider >,
    document.getElementById('react-parent-node')
  );
});
