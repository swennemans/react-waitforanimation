import React, { Component } from 'react';
import { render } from 'react-dom';
import WaitForAnimation from '../../src/WaitForAnimation';

import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      open: false,
      message: '..' 
    };
  }

  componentDidUpdate(prevProps) {
    const { animationDidFinish } = this.props;
    if (animationDidFinish && animationDidFinish !== prevProps.animationDidFinish) {
      this.someBlockingAction();
    }
  }

  someBlockingAction() {
    new Array(10000000).join().split(',').map((item, index) => ++index);
    this.setState({ message: 'Finished! '});
  }

  toggleMenu() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  reset() {
    this.props.resetAnimationState();
    this.setState({ message: '...', open: false });
  }

  render() {
    return (
      <div>
        <div className={`App ${this.state.open ? 'App_Show': ''}`}>
          <h1>{this.state.message}</h1>
        </div>
        <div className="button-container">
        <button 
          onClick={() => this.toggleMenu()}
          className="Button"
        >
        Toggle
        </button> 
          <button 
          onClick={() => this.reset() }
          className="Button"
        >
        RESET
        </button> 
        </div>
      </div>
    )
  }
}

const MyApp = WaitForAnimation(App);

render(<MyApp/>, document.getElementById('root'));