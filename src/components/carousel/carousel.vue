<template>
  <div class="carousel" :class="this.$route.path.indexOf('topic')>0?'zindex1':''">
    <headTop :headTitle="titleName"></headTop>
    <div class="box">

      <div class="comment" @click='toComment'>
        <span class="num">{{commentnum}}</span>
        <div class="border-dian"><div class="dian"></div></div>
      </div>

      <swiper :options="swiperOption" class="carouselbox">
        <swiper-slide class="carousel-item" v-for="(item,index) in slides" :key="index">
          <img :src="item.image" alt="" class="img"/>
        </swiper-slide>
      </swiper>

      <div class="content">
        <div class="title">
          <span class="currenttitle">{{title}}</span>
          <span class="currentnum">{{current}}/{{slides.length}}</span>
        </div>
        <div class="description"><span>{{description}}</span></div>
      </div>
    </div>
    <transition name="router-slide">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
  import headTop from '@/components/commen/head'
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {getcarousel,hotcomment} from '@/service/getData'
  export default {
  name: 'carousel',
  data () {
    return {
      titleName:'图片',
      slides:[],
      title:'',
      current:1,
      description:'',
      commentnum:'',
      commentsUrl:'',
      page:1,
      swiperOption: {
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 3000,
        perspective:15,
        autoplayDisableOnInteraction: false,
        notNextTick: true,
        onSlideChangeEnd: swiper => {
          this.changeSlide(swiper.realIndex)
        }
      },
      y:0
    }
  },
  created(){
    this.y = document.body.scrollTop
    document.body.setAttribute("class","hid");
  },
  mounted(){
    this.init();
  },
  destroyed(){
    let path = this.$route.path;
    if(path =='/home'||path =='/topic'){
      document.body.removeAttribute("class","hid");
      document.body.scrollTop = this.y
    }

  },
  methods: {
    async init() {
      let type = null;
      if(!this.$route.query.type){
        let path = this.$route.fullPath;
        let num = path.indexOf("?")+1;
        let keyStr = path.substr(num);
        type = this.GetQueryString(keyStr,'type')
      }else{
        type = this.$route.query.type
      }
      let response = await getcarousel(type);

      let data = response.data.body;
      this.slides = data.slides;
      this.title = data.title;
      this.description = data.slides[0].description;
      this.commentsUrl = data.commentsUrl;

      response = await hotcomment(this.page,this.commentsUrl)
      this.commentnum = response.data.join_count
    },

    changeSlide(index){
      this.current = index+1;
      this.description = this.slides[index].description
    },
    toComment(){
      this.$router.push('/comment?title='+this.title+'&url='+this.commentsUrl)
    },
    GetQueryString(str,name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = str.match(reg);
     if(r!=null)return  unescape(r[2]); return null;
    }
  },
  components:{swiper, swiperSlide,headTop},

}
</script>

<style scoped lang="scss">
@import '../../style/mixin';
.carousel{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 2;
  background-color: #000;
  overflow: auto;
  .box{
    width:100%;
    height:100%;
    overflow: auto;
    padding-top: 1.093333rem;
    .comment{
      color: #fff;
      position: absolute;
      right: 0;
      top: 1.093333rem;
      display: flex;
      align-items: center;
      font-size:15px; /*px*/
      z-index: 2;
      width: 100%;
      flex-direction: row-reverse;
      background: #000;
      .border-dian{
        border: 1px solid #fff;
        background: #000;
        border-radius: 0.133333rem 0.133333rem 0 0.133333rem;
        @include wh(0.746667rem,0.426667rem);
        position: relative;
        &::before{
          position: absolute;
          content: ".";
          top: -0.16rem;
          left: 0.3rem;
          color: #fff
        }
        &::after{
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          border-right: 0.106667rem solid transparent;
          border-left: 0.106667rem solid #fff;
          border-top: 0.106667rem solid transparent;
          right: -0.24rem;
          bottom: -0.026667rem
        }
      }
      .dian{
        position: relative;
        color: #fff;
        height: 100%;
        text-align: center;
        &::before{
          position: absolute;
          content: ".";
          top: -0.16rem;
          left: 0.133333rem;
          color: #fff
        }
        &::after{
          position: absolute;
          content: ".";
          top: -0.16rem;
          right: 0.133333rem;
          color: #fff
        }
      }
      .num{
        margin: 0 0.266667rem;
      }
    }
    .carouselbox {
      width: 100%;
      height: 100%;z-index: 1;
      .carousel-item{
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        .img{
          width:100%;
        }
      }
    }
    .content{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.266667rem;

      color: #fff;
      background: rgba(0,0,0,.3);
      z-index: 1;
      .title{
        display: flex;
        justify-content: space-between;
      }
      .currenttitle{
        flex: 1;
        font-size:16px; /*px*/
      }
      .currentnum{
        width: 1.066667rem;
        text-align: right;
      }
      .description{
        padding: 0.266667rem 0;
        font-size:14px; /*px*/
        color: #eee;
        overflow-y: auto;
        height: 4.266667rem
      }
    }
  }
}

</style>
