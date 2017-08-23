/**
 * 配置编译环境和线上环境之间的切换
 *
 * xxxUrl: 域名地址
 * routerMode: 路由模式
 *
 */
let iclienturl;
let ifeng3gurl;
let routerMode;
let commenturl;
if (process.env.NODE_ENV == 'development') {
  iclienturl = 'iclient/'
  ifeng3gurl = 'ifeng3g/'
  commenturl = 'comment',
  routerMode = 'hash'
}else{
  iclienturl = 'https://api.iclient.ifeng.com/';
  ifeng3gurl = 'https://api.3g.ifeng.com/';
  commenturl = 'http://comment.ifeng.com/';
  routerMode = 'hash';
}

export {
	iclienturl,
  ifeng3gurl,
	routerMode,
  commenturl
}
