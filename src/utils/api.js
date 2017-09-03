export default {
  //学习接口
  course: {},
  //关卡接口
  level: {},
  //测试接口
  test: {},
  //日常接口
  daily: {},
  //统计报表接口
  count: {},
  //公共接口
  config: {
    qiniu_upload: 'http://upload.qiniu.com/',
    qiniu_url: 'http://ojiowy5mw.bkt.clouddn.com/',
    qiniu_token: 'file/qiuniu/uploadToken',
    qiniu_suffix: '?watermark/2/text/6IuR5Lic55Sf54mp/font/5a6L5L2T/fontsize/500/fill/I0ZDRkNGQw==/dissolve/86/gravity/SouthEast/dx/10/dy/10',
    captcha: 'http://115.29.239.213:8094/piccapt?code=<%=code%>',
    sendCode: 'api-user/public/sendCode?mobile=<%=mobile%>&picCode=<%=picCode%>&codeKey=<%=codeKey%>&msgType=<%=msgType%>',
    area: 'http://jisuarea.market.alicloudapi.com/area/all',
    area_query: 'http://jisuarea.market.alicloudapi.com/area/query?parentid=<%=parentid%>'
  }
}
