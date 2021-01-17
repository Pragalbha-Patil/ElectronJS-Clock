const numbers = [
0x7E,
0x30,
0x6D,
0x79,
0x33,
0x5B,
0x5F,
0x70,
0x7F,
0x7B];


const Colon = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: `Colon ${props.blink ? 'Colon--blink' : ''}` }));

};

const Segment = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: `Segment Segment-${props.position} ${props.on ? 'Segment--on' : ''}` }));

};

const Display = props => {
  const segments = ["G", "F", "E", "D", "C", "B", "A"];
  const bit = numbers[props.value];
  return /*#__PURE__*/(
    React.createElement("div", { className: "Display" },
    segments.map((seg, i) => {
      return /*#__PURE__*/React.createElement(Segment, { on: (bit >> i & 1) == 1 ? true : false, position: seg });
    })));


};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.parseTime();
  }

  componentDidMount() {
    this.timerID = setInterval(
    () => this.tick(),
    1000);

  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  parseTime() {
    const hours = (new Date().getHours() % 12).toString().split('');
    const minutes = new Date().getMinutes().toString().split('');
    const seconds = new Date().getSeconds().toString().split('');

    if (hours.length == 1) {
      hours.splice(0, 0, null);
    }
    if (hours[0] == '0' && hours[1] == '0') {
      hours[0] = '1';
      hours[1] = '2';
    }
    if (minutes.length == 1) {
      minutes.splice(0, 0, '0');
    }

    if (seconds.length == 1) {
      seconds.splice(0, 0, '0');
    }

    return { hours: hours, minutes: minutes, seconds: seconds };
  }

  tick() {
    this.setState(this.parseTime());
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' } }, /*#__PURE__*/
      React.createElement(Display, { value: this.state.hours[0] }), /*#__PURE__*/
      React.createElement(Display, { value: this.state.hours[1] }), /*#__PURE__*/
      React.createElement(Colon, null), /*#__PURE__*/
      React.createElement(Display, { value: this.state.minutes[0] }), /*#__PURE__*/
      React.createElement(Display, { value: this.state.minutes[1] }), /*#__PURE__*/
      React.createElement(Colon, { blink: true }), /*#__PURE__*/
      React.createElement(Display, { value: this.state.seconds[0] }), /*#__PURE__*/
      React.createElement(Display, { value: this.state.seconds[1] })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Clock, null), document.getElementById("root"));