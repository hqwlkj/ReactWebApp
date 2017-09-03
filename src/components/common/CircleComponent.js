'use strict';

import React from 'react';
import ProgressBar from 'progressbar.js';

require('styles//common/Circle.less');

class CircleComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className='circle-component' style={{
        height:this.props.width,
        width:this.props.width,
        margin:'auto'
      }}>
        {this.props.items.map((item,index)=>{
          return(<ItemCompont key={`circle-item-${index}`} width={this.props.width-index*22} percent={item.value} bgColor={item.bgColor} color={item.color}/>);
        })}
        <div className='texts'>
          {this.props.items.map((item,index)=>{
            return(<div className='text' key={`circle-item-text-${index}`} style={{color:item.textColor}}><span>{(item.value*100).toFixed(1)}%</span><p >{item.text}</p></div>);
          })}
        </div>
      </div>
    );
  }
}

CircleComponent.displayName = 'UiCircleComponent';

// Uncomment properties you need
// CircleComponent.propTypes = {};
CircleComponent.defaultProps = {
  width:110,
  items:[]
};

class ItemCompont extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let bar = new ProgressBar.Circle(document.querySelector('#'+this.state.id), {
      strokeWidth: 8,
      easing: 'easeInOut',
      duration: 1400,
      color: this.props.color,
      trailColor: '#5bccb5',
      trailWidth: 8,
      svgStyle: null,
      fill: this.props.bgColor
    });
    // console.log(this.props.percent,(this.props.percent*100).toFixed(1));
    bar.animate(this.props.percent);
  }
  componentWillMount(){
    this.setState({
      id:'pro'+Date.now() +''+ (Math.floor(Math.random()*10000000000%100000))
    });
  }
  render(){
    return(
      <div id={this.state.id} className='item' style={{
        height:this.props.width,
        width:this.props.width
      }}/>
    );
  }
}

export default CircleComponent;
