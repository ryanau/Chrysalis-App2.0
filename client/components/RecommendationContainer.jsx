var React = require('react');
var Slider = require('rc-slider');
var StocksContainer = require('./StocksContainer.jsx')

var RecommendationContainer= React.createClass({
  getInitialState: function () {
    return {
      risk_preference: null,
    };
  },

  componentDidMount: function(){
    this.readUserInfoFromApi();
  },

  readUserInfoFromApi: function(){
    console.log('reading')
    this.props.readFromAPI(this.props.origin + '/users/profile', function(info){
      console.log('setting')
      this.setState({risk_preference: info.risk_preference});
    }.bind(this));
  },

  handleRiskSliderMove: function (value) {
    this.setState({risk_preference: value});
  },
  render: function () {
    if (this.state.risk_preference != null) {
      return (
        <div>
          <h1>Recommendation Page</h1>
          <label for="risk_preference">Risk Preference: {this.state.risk_preference}</label>
          <br />
          <Slider defaultValue={this.state.risk_preference} min={1} max={10} onChange={this.handleRiskSliderMove} signedIn={this.state.signedIn} currentUser={this.state.currentUser}/>
          <br />
          <StocksContainer risk={this.state.risk_preference} readFromAPI={this.props.readFromAPI} origin={this.props.origin} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Your Recommendation is Loading...</h1>
        </div>
      );
    };
    
  },
});

module.exports = RecommendationContainer;
