import axios from 'axios'

import '../config/http'
import {iclienturl,ifeng3gurl} from '../config/env'
//新闻
// export const news = (id,page,gv) => axios.post(iclienturl+'ClientNews', {id:id,page:page,gv:gv})
export const getnews = (id,page,gv) => axios.post(iclienturl+'ClientNews?id='+id+'&page='+page+'&gv='+gv)
