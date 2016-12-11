import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var BjsApp = BjsApp || {};
    
    return (
      <div>
        <canvas id="renderCanvas"></canvas> 
      </div>         
    );
  }
}

export default Main;
