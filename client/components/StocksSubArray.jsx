var React = require('react');
var mui = require('material-ui');
var Card = mui.Card;
var CardHeader = mui.CardHeader;
var CardText = mui.CardText;
var CardActions = mui.CardActions;
var ThemeManager = new mui.Styles.ThemeManager();
var FlatButton = mui.FlatButton;
var Dialog = mui.Dialog;

var StocksSubArray = React.createClass({
  getInitialState: function(){
    return{
      definitions: null,
    };
  },

  componentDidMount: function(){
    this.getDefinitionsFromAPI();
  },

	childContextTypes: {
    muiTheme: React.PropTypes.object
  },

	getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getDefinitionsFromAPI: function(){
    this.props.readFromAPI(this.props.origin + '/definitions', function(info){
      this.setState({definitions: info});
    }.bind(this));
  },

	handleMouseOver: function(){
    console.log("shit");
    this.refs.betaDialog.show();
  },

	render: function () {

		var stocks = this.props.stocks.map(function (stock, index) {
			return (
				<Card initiallyExpanded={false}>
		      <CardHeader
		      	key={index}
		        title={stock.ticker}
		        subtitle={stock.name}
		        showExpandableButton={true}>
		      </CardHeader>
		      <CardText expandable={true}>
		      		<Dialog ref="betaDialog">{this.state.definitions["Beta"]}</Dialog>
		      		<div className="definition" onMouseOver={this.handleMouseOver}>
		      		Beta: {stock.beta}
		      		</div><br/>
					{stock.info}
		      </CardText>
		      <CardActions expandable={true}>
		        <FlatButton label="Action1"/>
		        <FlatButton label="Action2"/>
		      </CardActions>
		    </Card>
			);
		}.bind(this));
		return (
			<div>
				{stocks}
			</div>
		);
	},

});

module.exports = StocksSubArray;