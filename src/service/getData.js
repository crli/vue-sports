import axios from 'axios'
import '../config/http'
import {iclienturl,ifeng3gurl,commenturl} from '../config/env'
//新闻
// export const news = (id,page,gv) => axios.post(iclienturl+'ClientNews', {id:id,page:page,gv:gv})
export const getnews = (id,page,gv) => axios.post(iclienturl+'ClientNews?id='+id+'&page='+page+'&gv='+gv)
//轮播图
export const getcarousel = (url) => axios.get(ifeng3gurl+url)
// 热评
export const hotcomment = (page,url) => axios.get(commenturl+'/get?job=1&orderby=uptimes&order=DESC&p='+page+'&docurl='+url)
