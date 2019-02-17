import React, { Component } from 'react';

import GuardianContent from "./components/GuardianContent";

const stylesApp = {
  marginTop: 40
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={ stylesApp }>
          <GuardianContent/>
        </div>
      </div>
    );
  }
}

export default App;
