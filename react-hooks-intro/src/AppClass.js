import React, { Component } from 'react';
const Fragment = React.Fragment;

class AppClass extends Component {
  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null
  };

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  handleMouseMove = event => {
    this.setState({
      x: event.pageX,
      y: event.pageY
    })
  };

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  };

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }))
  };
  render() {
    return (
      <Fragment>
        <h2>Counter</h2>
        <button onClick={this.incrementCount}>I Was Clicked {this.state.count} times</button>
        <h2>Toggle light</h2>
        <div
          style={{
            height: '80px',
            width: '80px',
            background: this.state.isOn ? 'darkblue' : 'purple'
          }}
          onClick={this.toggleLight}
        />
        <h2>Mouse position</h2>
        <p>X position: {this.state.x}</p>
        <p>Y position: {this.state.y}</p>
      </Fragment>
    );
  }
}

export default AppClass;
