'use strict';

import React from 'react';
import { InputItem ,Toast } from 'antd-mobile';

require('styles/common/Tags.less');

class TagsComponent extends React.Component {
  constructor( props ){
    super(props);
    this.state = {
      tags:[],
      selected:[]
    }
    this.handleClick = this.handleClick.bind(this);
  }
  loadData(){
    let item = this.props.item;
    request({
      type: 'get',
      url: item.chlidOptionsUrl,
      data: {},
      success: (data)=> {
        if( data.status != 0){
          Toast.fail(data.message,2);
          return ;
        }
        this.setState({
          tags:data.list || data.lst || []
        });
      }
    });
  }
  componentWillMount(){
    //console.log('componentWillMount');
    this.loadData();
  }
  componentWillReceiveProps(){
    //console.log('componentWillReceiveProps');
    // return;

    const {item,form} = this.props;
    let values = form.getFieldsValue();
    let selected = (values[item.dataIndex] || '').split(',');
    selected = selected.filter((item)=>{
      return !!item;
    }).map((item)=>{
      return parseInt(item);
    });
    this.setState({
      selected:selected
    });
  }
  handleClick(tag){
    let selected = this.state.selected.filter((item)=>{
      return tag.id != item;
    });
    if( selected.length === this.state.selected.length){
      selected.push(tag.id);
    }
    this.setState({
      selected:selected
    });

    const {item,form} = this.props;
    let values = form.getFieldsValue();
    values[item.dataIndex] = selected.join(',');
    form.setFieldsValue(values);
  }
  render() {
    return (
      <div className="tags-component">
        <InputItem type='hidden' {...this.props}/>
        {this.state.tags.map((tag)=>{
          let selected = false;
          for(let i = 0;i <= this.state.selected.length; i++){
            if( this.state.selected[i] === tag.id){
              selected = true;
              break;
            }
          }
          return(
            <span
              className={selected?'tag active':'tag'}
              onClick={()=>{
                this.handleClick(tag);
              }}
            >{tag.name}</span>
          );
        })}
      </div>
    );
  }
}

TagsComponent.displayName = 'CommonTagsComponent';

// Uncomment properties you need
// TagsComponent.propTypes = {};
// TagsComponent.defaultProps = {};

export default TagsComponent;
