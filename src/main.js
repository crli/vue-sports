import Vue from 'vue'
import App from './App'
import router from './router/'
import './config/http'
import './config/flexible'
import './config/fastclick'
import 'mint-ui/lib/style.css'
import './style/swiper.min.css'



if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}


window.onload=function () {
    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
            event.preventDefault();
        }
    })
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){
            event.preventDefault();
        }
        lastTouchEnd=now;
    },false)
}
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

