/**
 * Created by yanghc on 2017/3/29.
 */
import MD5 from 'MD5';
//JS 工具内
import Config from 'config';

export function checkIsUserAccout(str) {
  if (!Config.validateRules.isEmail(str) && !Config.validateRules.isMobile(str))
    return false;
  return true;
}

//密码验证
export function checkPassWord(pwd) {
  if (Config.validateRules.isNull(pwd)) {
    return '请输入密码';
  } else if (!Config.validateRules.betweenLength(pwd, 6, 30)) {
    return '请输入一个长度范围在6~30位之间的密码';
  } else if (Config.validateRules.weakPwd(pwd)) {
    return '输入的密码过于简单，请重新输入';
  } else {
    return true;
  }
}

//昵称验证
export function checkNickName(str) {
  if (Config.validateRules.isNull(str)) {
    return '请输入昵称';
  } else if (!Config.validateRules.betweenLength(str, 2, 30)) {
    return '请输入长度范围在2~30位之间的昵称';
  } else {
    return true;
  }
}

//验证码验证
export function checkCaptcha(str) {
  if (Config.validateRules.isNull(str)) {
    return '请输入验证码';
  } else {
    return true;
  }
}

//密码加密处理
export function hex_pwd(pwd) {
  return MD5(pwd);
}


export function convertJSONToFormData(jsonData) {
  let form_data = [];
  for (let key in jsonData) {
    form_data.push(key + "=" + jsonData[key]);
  }
  return form_data.join("&");
}

export function formatPostData(data) {
  return convertJSONToFormData(data);
}


/**
 * 格式化阿里云 全国省市县行政区划 数据
 * @param data 全部数据
 * @param parentId 父级地区ID
 * @returns {Array}
 */
export function formatAreaData(data, parentId = '0', level = 0) {
  let options = [];
  for (let key in data) {
    if (data[key].parentid === parentId) {
      let option = {};
      option.value = data[key].id;
      option.label = data[key].name;
      option.parentid = data[key].parentid;
      option.parentname = data[key].parentname;
      option.areacode = data[key].areacode;
      option.zipcode = data[key].zipcode;
      option.depth = data[key].depth;
      if (level === 0) { //国家-省
        let children = formatAreaData(data, data[key].id);
        if (children.length > 0) {
          option.children = children;
        }
      }
      options.push(option);
    }
  }
  return options;
}


export function checkNetWork() {
  return navigator.onLine;
}

/**
 * 获取 国家 数据
 * @param data
 * @returns {Array}
 */
export function getCountry(data) {
  let options = formatAreaData(data, '51', 1);
  let option = {};
  option.value = '9999';
  option.label = '中国';
  option.parentid = '0';
  option.parentname = '';
  option.areacode = '0086';
  option.zipcode = '';
  option.depth = '2';
  options.unshift(option);
  return options;
}
/**
 * 获取 国家-省 数据
 * @param data
 * @returns {Array}
 */
export function getCountryProvince(data) {
  let options = [];
  let option = {};
  option.value = '9999';
  option.label = '中国';
  option.parentid = '0';
  option.parentname = '';
  option.areacode = '0086';
  option.zipcode = '';
  option.depth = '2';
  option.children = formatAreaData(data, '0', 1);
  options.push(option);
  return options;
}


/**
 * 获取 国家-省-市 数据
 * @param data
 * @returns {Array}
 */
export function getCountryProvinceCity(data) {
  let options = [];
  let option = {};
  option.value = '9999';
  option.label = '中国';
  option.parentid = '0';
  option.parentname = '';
  option.areacode = '0086';
  option.zipcode = '';
  option.depth = '2';
  option.children = formatAreaData(data, '0', 0);
  options.push(option);
  return options;
}
/**
 * 获取 省-市 数据
 * @param data
 * @returns {Array}
 */
export function getProvinceCity(data) {
  return formatAreaData(data, '0', 0);
}

//生成Canvas 动态背景
export function createBg() {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return;
  }
  let canvas = document.querySelector('canvas');
  // if(!canvas){
  //   canvas = document.createElement('canvas');
  //   canvas.className = 'login-bg'
  //   document.body.appendChild(canvas);
  // }

  let ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.lineWidth = .3;
  ctx.strokeStyle = (new Color(150)).style;

  let mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  let dots = {
    nb: 110, //需要生成的点的数量
    distance: 100, //点之间连线的距离
    d_radius: 150, //需要连接的范围
    array: []
  };

  function colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
  }

  function createColorStyle(r, g, b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
  }

  function mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }

  function averageColorStyles(dot1, dot2) {
    let color1 = dot1.color,
      color2 = dot2.color;

    let r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
      g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
      b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
  }

  function Color(min) {
    min = min || 0;
    //线条颜色
    // this.r = colorValue(min);
    // this.g = colorValue(min);
    // this.b = colorValue(min);
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.style = createColorStyle(this.r, this.g, this.b);
  }

  function Dot() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random() * 2;

    this.color = new Color();
  }

  Dot.prototype = {
    draw: function () {
      ctx.beginPath();
      ctx.fillStyle = this.color.style;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);//画圆点
      ctx.fill();
    }
  };

  function createDots() {
    for (let i = 0; i < dots.nb; i++) {
      dots.array.push(new Dot());
    }
  }

  function moveDots() {
    for (let i = 0; i < dots.nb; i++) {

      let dot = dots.array[i];

      if (dot.y < 0 || dot.y > canvas.height) {
        dot.vx = dot.vx;
        dot.vy = -dot.vy;
      }
      else if (dot.x < 0 || dot.x > canvas.width) {
        dot.vx = -dot.vx;
        dot.vy = dot.vy;
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  }

  function connectDots() {
    let i_dot = [];
    let j_dot = [];
    for (let i = 0; i < dots.nb; i++) {
      for (let j = 0; j < dots.nb; j++) {
        i_dot = dots.array[i];
        j_dot = dots.array[j];

        if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
          if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
            ctx.beginPath();
            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
            ctx.moveTo(i_dot.x, i_dot.y);
            ctx.lineTo(j_dot.x, j_dot.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }

  function drawDots() {
    for (let i = 0; i < dots.nb; i++) {
      let dot = dots.array[i];
      dot.draw();
    }
  }

  function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveDots();
    connectDots();
    drawDots();

    requestAnimationFrame(animateDots);
  }

  document.querySelector('canvas').onmousemove = function (e) {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
  };

  document.querySelector('canvas').onmouseleave = function (e) {
    mousePosition.x = canvas.width / 2;
    mousePosition.y = canvas.height / 2;
  };

  createDots();
  requestAnimationFrame(animateDots);
}


export function clearCanvasBg() {
  let canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.remove();
  }
}

//重定向邮箱地址
export function redirectEmail2(mail){
  let $t = mail.split("@")[1];
  $t = $t.toLowerCase();
  let mailAddress = '';
  switch ($t){
    case '163.com':
      mailAddress = "mail.163.com";
      break;
    case 'vip.163.com':
      mailAddress = "vip.163.com";
      break;
    case '126.com':
      mailAddress = "mail.126.com";
      break;
    case ('qq.com' || 'vip.qq.com' || 'foxmail.com'):
      mailAddress = "mail.qq.com";
      break;
    case 'gmail.com':
      mailAddress = "mail.google.com";
      break;
    case 'sohu.com':
      mailAddress = "mail.sohu.com";
      break;
    case 'tom.com':
      mailAddress = "mail.tom.com"
      break;
    case 'vip.sina.com':
      mailAddress =  "vip.sina.com";
      break;
    case ("yahoo.com.cn" || "yahoo.cn"):
      mailAddress = "mail.cn.yahoo.com";
      break;
    default:
      mailAddress = "";
      break;
  }
  return mailAddress;
}


export function redirectEmail(mail) {
  let $t = mail.split("@")[1];
  $t = $t.toLowerCase();
  if ($t == "163.com") {
    return "mail.163.com"
  } else {
    if ($t == "vip.163.com") {
      return "vip.163.com"
    } else {
      if ($t == "126.com") {
        return "mail.126.com"
      } else {
        if ($t == "qq.com" || $t == "vip.qq.com" || $t == "foxmail.com") {
          return "mail.qq.com"
        } else {
          if ($t == "gmail.com") {
            return "mail.google.com"
          } else {
            if ($t == "sohu.com") {
              return "mail.sohu.com"
            } else {
              if ($t == "tom.com") {
                return "mail.tom.com"
              } else {
                if ($t == "vip.sina.com") {
                  return "vip.sina.com"
                } else {
                  if ($t == "sina.com.cn" || $t == "sina.com") {
                    return "mail.sina.com.cn"
                  } else {
                    if ($t == "tom.com") {
                      return "mail.tom.com"
                    } else {
                      if ($t == "yahoo.com.cn" || $t == "yahoo.cn") {
                        return "mail.cn.yahoo.com"
                      } else {
                        if ($t == "tom.com") {
                          return "mail.tom.com"
                        } else {
                          if ($t == "yeah.net") {
                            return "www.yeah.net"
                          } else {
                            if ($t == "21cn.com") {
                              return "mail.21cn.com"
                            } else {
                              if ($t == "hotmail.com") {
                                return "www.hotmail.com"
                              } else {
                                if ($t == "sogou.com") {
                                  return "mail.sogou.com"
                                } else {
                                  if ($t == "188.com") {
                                    return "www.188.com"
                                  } else {
                                    if ($t == "139.com") {
                                      return "mail.10086.cn"
                                    } else {
                                      if ($t == "189.cn") {
                                        return "webmail15.189.cn/webmail"
                                      } else {
                                        if ($t == "wo.com.cn") {
                                          return "mail.wo.com.cn/smsmail"
                                        } else {
                                          if ($t == "139.com") {
                                            return "mail.10086.cn"
                                          } else {
                                            if ($t == "outlook.com" || $t == "hotmail.com") {
                                              return "login.live.com"
                                            } else {
                                              return ""
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
