<template>
  <div class="home">

    <swiper :options="swiperOption" class="swiper-wrap" v-if="swiper.length">
      <swiper-slide v-for="(item,index) in swiper" :key="index"  v-if="item.type!='web'">
        <span class="title">{{item.title}}</span>
        <img :src="item.thumbnail" alt="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="swiper.length>1"></div>
    </swiper>

    <section class="topic">
      <div class="category" v-for="(item,index) in topic.item">
        <img :src="item.thumbnail" />
        <span class="title">{{item.title}}</span>
      </div>
    </section>

    <section class="project-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <div class="project" v-for="(item,index) in news.item" >

        <div class="newsitem" v-if="item.type=='doc'">
          <img v-if="item.thumbnail" :src="item.thumbnail" class="img"/>
          <div v-else class="none">暂无图片</div>
          <div class="cont">
            <span>{{item.title}}</span>
            <span class="time">{{item.updateTime}}</span>
            <span class="commentnum">{{item.commentsall}}</span>
          </div>
        </div>

        <div class="videoitem" v-else-if="item.type=='phvideo'">
          <div class="title">{{item.title}}</div>
          <div class="video">
            <img :src="item.thumbnail" class="img"/>
            <span class="commentnum">{{item.commentsall}}</span>
          </div>
        </div>

        <div class="newslide" v-else-if="item.type=='slide'">
          <div class="title">{{item.title}}</div>
          <div class="imgbox">
            <img v-for="img in item.style.images" class="img" :src="img"></image>
          </div>
          <span class="commentnum">{{item.commentsall}}</span>
        </div>

        <div class="newsitem" v-if="item.type=='topic2'">
          <img v-if="item.thumbnail" :src="item.thumbnail" class="img" />
          <div v-else class="none">暂无图片</div>
          <div class="cont">
            <span>{{item.title}}</span>
            <span class="subtopic">专题</span>
            <span class="commentnum">{{item.commentsall}}</span>
          </div>
        </div>

      </div>
    </section>

    <footer>
      <div class="loader-more" v-show="!loadernone">正在加载更多...</div>
      <div class="loader-none" v-show="loadernone">已经全部加载完毕</div>
    </footer>

    <transition name="router-slide">
      <router-div></router-div>
    </transition>
  </div>

</template>

<script>

import VueAwesomeSwiper from 'vue-awesome-swiper'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import infiniteScroll from 'vue-infinite-scroll'
import {iclienturl} from '@/config/env'
import {news} from '@/service/getData'
export default {
  name: 'home',
  data () {
    return {
      swiper: [],
      news: [],
      topic:[],
      page:1,
      busy: true,
      loadernone:false,//没有数据提示
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 3000,
        perspective:15,
        autoplayDisableOnInteraction: false,
        notNextTick: true
      },
    }
  },
  created(){
    this.init();
  },

  methods: {
    async init() {
      let response = await news('TY43,FOCUSTY43,TYTOPIC',this.page++,'5.4.0');
      response.data.forEach((obj, index) => {
        if (obj.item){
          let type = obj.type;
          if (type == 'focus') {
            this.swiper = obj.item
          }else if (type == 'list') {
            this.news = obj
          }else if (type == 'tytopic') {
            this.topic = obj
          }
        }
      })
      this.busy = false;
    },
    async loadMore(){
      this.busy = true;
      this.loadernone = false;
      if(this.page <= this.news.totalPage){
        let response = await news('TY43',this.page++,'5.4.0');
        this.news.item = [...this.news.item,...response.data[0].item];
      }else{
        this.loadernone = true;
        return false
      }
      this.busy = false;
    },
  },

  directives: {infiniteScroll},

  components:{swiper, swiperSlide}
}
</script>

<style scoped lang="scss">
@import '../../style/mixin';

.swiper-wrap {
  height: 4.8rem;
  width: 100%;
  position: relative;
  img {
    height: 100%;
    width: 100%;
  }
  .title{
      position: absolute;
      bottom: 0;
      left: 0.266667rem;
      @include font-dpr(16px)
      color: #fff;
  }
}
.topic{
  padding: 0 0.266667rem;
  margin: 0.533333rem 0 0.133333rem;
  display: flex;
  justify-content: space-between;
  .category{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img{
    @include wh(1.786667rem,1.386667rem)
  }
  .title{
    line-height: 0.8rem;
    @include font-dpr(16px)
  }
}
.newsitem {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 0.4rem;
  position: relative;
  .img {
    @include wh(2.64rem,1.88rem)
    margin-right: 0.2rem;
  }
  .none {
    @include wh(2.64rem,1.88rem)
    margin-right: 0.2rem;
    text-align: center;
    line-height: 1.866667rem;
    @include font-dpr(15px);
    border: 1px solid #eee;
    box-sizing: border-box
  }
  .cont{
    flex: 1;
    position: relative;
    @include font-dpr(14px);
  }
  .commentnum{
    position: absolute;
    bottom: 0;
    right: 0;
    @include font-dpr(12px);
  }
  .time{
    position: absolute;
    bottom: 0;
    left: 0;
    @include font-dpr(12px);
  }
  .subtopic{
    position: absolute;
    bottom: 0;
    left: 0;
    @include font-dpr(12px);
    color: #fff;
    padding: 0.08rem 0.133333rem;
    background: red;
  }
}

.newslide{
  position: relative;
  border-bottom: 1px solid #eee;
  padding: 0px 0.4rem 0.533333rem;
  @include font-dpr(16px);
  .title{
    text-align: center;
    line-height: 0.666667rem;
  }
  .imgbox{
    display: flex;
    justify-content: space-around;
    .img{
      padding: 0.133333rem;
      height: 2.666667rem;
      width:33.3%;
    }
  }
  .commentnum{
    position: absolute;
    bottom: 0;
    right: 0.4rem;
    @include font-dpr(12px);
  }
}

.videoitem{
  padding: 0.4rem;
  position: relative;
  .title{
    @include font-dpr(16px);
    margin-bottom: 0.4rem
  }
  .img{
    width: 100%;
    height: 5.066667rem;
  }
  .commentnum{
    position: absolute;
    bottom: 0;
    right: 0.4rem;
    @include font-dpr(12px);
  }
}

</style>
