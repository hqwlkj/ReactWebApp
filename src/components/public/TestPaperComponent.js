'use strict';

import React from 'react';
import {NavBar, Modal, Carousel, Pagination, Badge, Progress, Checkbox, Radio, Flex} from 'antd-mobile';

require('styles/public/TestPaper.less');

let timer = 0;

class TestPaperComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarTitle: '在线考试',
      params: {},
      progressNum: 10,
      current: 0, //当前答题呈现的 试题
      answeredIds: [1, 2, 5, 8, 14], //已答题目的ID
      hidden: false,
      data: ['', '', ''],
      initialHeight: 100
    }
    this.countdown = this.countdown.bind(this);
    this.selectedPaperItem = this.selectedPaperItem.bind(this);
  }


  componentDidMount() {
    let navbarTitle = this.state.navbarTitle;
    if (this.state.params.type === '3') {
      navbarTitle = '倒计时 00:00';
    }
    // simulate img loading
    setTimeout(() => {
      this.setState({
        navbarTitle,
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
      }, () => {
        if (this.state.params.type === '3') {
          this.countdown();
        }
      });
    }, 100);
  }

  componentWillMount() {
    console.log(this.props.params);
    this.setState({params: this.props.params});
  }

  componentDidMount() {
    let progressNum = this.state.progressNum;
    timer = setInterval(() => {
      progressNum -- ;
      this.setState({progressNum}, () => {
        if (progressNum <= 0) {
          clearInterval(timer);
        }
      });
    }, 1000);
  }

  /**
   * 销毁&清理
   */
  componentWillUnmount() {
    //清除定时器
    clearInterval(timer);
  }

  goBackOff() {
    Modal.alert('提示', '是否放弃本次答题?', [
      {text: '取消', onPress: () => console.log('cancel')},
      {
        text: '确定', onPress: () => {
        window.history.go(-1)
      }
      }
    ])
  }

  /**
   **初始化考试倒计时时间
   **
   */
  countdown() {
    let answerTime = parseInt(this.state.params.time);
    if (answerTime === 0) return;
    let h = Math.floor(answerTime > 60 ? answerTime / 60 : 0);
    let m = ((answerTime % 60) - 1);
    let s = 59;
    let navbarTitle = '';
    timer = setInterval(() => {
      s--;
      if (s < 0) {
        s = 59;
        m--;
      }
      if (m <= 0 && h > 0) {
        m = 59;
        h--;
      }
      if (s < 10) {
        navbarTitle = '倒计时 ' + ( h > 0 ? (h <= 9 ? '0' + h : h) + ':' : '') + ( m <= 9 ? '0' + m : m) + ':0' + s;
      } else {
        navbarTitle = '倒计时 ' + ( h > 0 ? (h <= 9 ? '0' + h : h) + ':' : '') + ( m <= 9 ? '0' + m : m) + ':' + s;
      }
      this.setState({navbarTitle});
      if (h === 0 && m === 0 && s === 0) {
        clearInterval(timer);
        // TODO: 倒计时到了之后直接调用提交试卷的方法。
        Modal.alert('答题时间结束!', <p>放弃:放弃本次答题<br/>提交:提交当前答案</p>, [
          {
            text: '放弃', onPress: () => {
            window.history.go(-1)
          }
          },
          {text: '提交', onPress: () => console.log('这里调用提交的方法')}
        ]);
      }
    }, 1000)
  }

  /**
   * 考试时提供的选题
   * @param 数据index下标
   */
  selectedPaperItem(index) {
    this.setState({
      current: index,
      hidden: false
    })
  }

  render() {
    const hProp = this.state.initialHeight ? {padding: '5px'} : {};

    const paperList = null;


    return (
      <div className='test-paper-component'>
        <NavBar onLeftClick={() => {
          this.goBackOff()
        }} rightContent={this.state.params.type === '3' ? [
          <span key='0' style={{fontSize: '0.28rem'}} onClick={() => console.log('这里调用提交的方法')}><i className='carme-icon'
                                                                                                  style={{fontSize: '0.28rem'}}>&#xe600;</i>交卷</span>,
        ] : null}>{this.state.navbarTitle}</NavBar>

        {this.state.params.type === '3' ?
          <div className='test-paper-container'>
            <Pagination mode='number' total={this.state.data.length} current={this.state.current}/>
            <Carousel
              className='my-carousel'
              autoplay={false}
              infinite={false}
              selectedIndex={this.state.current}
              dots={false}
              swipeSpeed={35}
              afterChange={index => {
                this.setState({current: index})
              }}
            >
              {this.state.data.map(ii => (
                <div key={ii} className='paper' style={hProp}
                     onLoad={() => {
                       // fire window resize event to change height
                       window.dispatchEvent(new Event('resize'));
                       this.setState({
                         initialHeight: 75
                       });
                     }}
                >
                  <div className='question-title'>
                    <span className='tags'>单选题</span><Badge hot text='智能推荐' className='recommend'/>
                    我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息
                  </div>
                  <div className='question-content'>
                    <Checkbox.AgreeItem>3333</Checkbox.AgreeItem>
                    <Checkbox.AgreeItem>3333</Checkbox.AgreeItem>
                    <Checkbox.AgreeItem
                      multipleLine>33333333333333333333333333333333333333333333333333333333</Checkbox.AgreeItem>
                    <Checkbox.AgreeItem>3333</Checkbox.AgreeItem>
                    <Checkbox.AgreeItem>3333</Checkbox.AgreeItem>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                    <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>00000000</Radio></div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          :
          <div className='test-paper-container'>
            <div className={`progress-bar-container ${this.state.progressNum > 0 ? 'run':''}`}>
              <span className="runner" style={{animation:`progress-bar ${this.state.progressNum}s linear`}}></span>
              <div className="progress-bar-meter" style={{animation:`progress-bar-meter ${this.state.progressNum}s linear`}}></div>
            </div>
            <div className="paper-content">
              <div className='question-title'>
                <span className='tags'>单选题</span><Badge hot text='智能推荐' className='recommend'/>
                我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息我是题干信息
              </div>
              <div className='question-content'>
                <Checkbox.AgreeItem>3333</Checkbox.AgreeItem>
                <Checkbox.AgreeItem>3333</Checkbox.AgreeItem>
                <Checkbox.AgreeItem
                  multipleLine>33333333333333333333333333333333333333333333333333333333</Checkbox.AgreeItem>
                <Checkbox.AgreeItem>3333</Checkbox.AgreeItem>
                <Checkbox.AgreeItem>3333</Checkbox.AgreeItem>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>2222</Radio></div>
                <div className='my-radio'><Radio onChange={e => console.log('checkbox', e)}>00000000</Radio></div>
              </div>
            </div>
          </div>

        }

        {
          this.state.params.type === '3' ?
            <div>
              <div className='test-paper-footer' style={{bottom: !!this.state.hidden ? '-2rem' : '0'}}>
                <div className='selected-topic' onClick={() => {
                  this.setState({hidden: true});
                }}>
                  <div className='topic-icon'>
                    <i className='carme-icon'>&#xe624;</i>
                  </div>
                  <div className='topic-btn-text'>选题</div>
                </div>
              </div>
              <div className='selected-mask' onClick={() => {
                this.setState({hidden: false});
              }} style={{display: !!this.state.hidden ? 'block' : 'none'}}></div>
              <div className='selected-modal' style={{bottom: !!this.state.hidden ? '.5rem' : '-100vh'}}>
                <div className='selected-modal-info-box'>
                  <Flex>
                    <Flex.Item>共有：<span>20</span>题</Flex.Item>
                    <Flex.Item>已答：<span>2</span>题</Flex.Item>
                    <Flex.Item>未答：<span>18</span>题</Flex.Item>
                  </Flex>
                </div>
                <div className='selected-modal-content'>
                  {paperList}
                  <Flex className="paper-list">
                    <Flex.Item
                      className={`paper-item ${this.state.current === 0 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 0).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(0);
                      }}>1</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 1 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 1).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(1);
                      }}>2</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 2 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 2).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(2);
                      }}>3</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 3 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 3).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(3);
                      }}>4</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 4 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 4).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(4);
                      }}>5</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 5 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 5).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(5);
                      }}>6</Flex.Item>
                  </Flex>
                  <Flex className="paper-list">
                    <Flex.Item
                      className={`paper-item ${this.state.current === 6 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 6).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(6);
                      }}>7</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 7 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 7).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(7);
                      }}>8</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 8 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 8).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(8);
                      }}>9</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 9 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 9).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(9);
                      }}>10</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 10 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 10).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(10);
                      }}>11</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 11 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 11).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(11);
                      }}>12</Flex.Item>
                  </Flex>
                  <Flex className="paper-list">
                    <Flex.Item
                      className={`paper-item ${this.state.current === 12 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 12).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(12);
                      }}>13</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 13 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 13).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(13);
                      }}>14</Flex.Item>
                    <Flex.Item
                      className={`paper-item ${this.state.current === 14 ? 'current' : ''} ${this.state.answeredIds.filter(x => x === 14).length === 1 ? 'success' : ''}`}
                      onClick={() => {
                        this.selectedPaperItem(14);
                      }}>150</Flex.Item>
                    {/* TODO: 不够6个的时候补全站位 */}
                    <Flex.Item className="paper-item no-data">&nbsp;</Flex.Item>
                    <Flex.Item className="paper-item no-data">&nbsp;</Flex.Item>
                    <Flex.Item className="paper-item no-data">&nbsp;</Flex.Item>
                  </Flex>
                </div>
              </div>
            </div>
            :
            <div className='test-paper-footer'>
              <div className='next-btn'>
                下一题
              </div>
            </div>
        }
      </div>
    );
  }
}

TestPaperComponent.displayName = 'PublicTestPaperComponent';

// Uncomment properties you need
// TestPaperComponent.propTypes = {};
// TestPaperComponent.defaultProps = {};

export default TestPaperComponent;
