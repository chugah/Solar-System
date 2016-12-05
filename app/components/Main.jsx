import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>
          <div>
            <canvas id="renderCanvas"></canvas> 
          </div>         
        </div>
      </div>
    );
  }
}

export default Main;
