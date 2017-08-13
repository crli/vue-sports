<template>
  <div class="home">

    <swiper :options="swiperOption" class="swiper-wrap" v-if="swiper.length">
      <swiper-slide v-for="(item,index) in swiper" :key="index"  v-if="item.type!='web'">
        <span class="title">{{item.title}}</span>
        <img :src="item.thumbnail" alt="" @click="toCarousel(item.id)"/>
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
      <newslist :newslist="news.item" @toCarousel="toCarousel"></newslist>
    </section>

    <loading :loadernone="loadernone"></loading>

    <transition name="router-slide">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
import newslist from '@/components/commen/newslist'
import loading from '@/components/commen/loading'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import infiniteScroll from 'vue-infinite-scroll'
import {iclienturl} from '@/config/env'
import {getnews} from '@/service/getData'
import {dealurl} from '@/config/mUtils'
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
      let response = await getnews('TY43,FOCUSTY43,TYTOPIC',this.page++,'5.4.0');
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
        let response = await getnews('TY43',this.page++,'5.4.0');
        this.news.item = [...this.news.item,...response.data[0].item];
      }else{
        this.loadernone = true;
        return false
      }
      this.busy = false;
    },
    toCarousel(params){
      if(params.indexOf(".com/")>0){
        this.$router.push('/home/carousel?'+dealurl(params))
      }else{
        this.$router.push('/home/carousel?'+params)
      }
    }
  },

  directives: {infiniteScroll},

  components:{swiper, swiperSlide,newslist,loading}
}
</script>

<style scoped lang="scss">
@import '../../style/mixin';
.home{
  width: 100%;
}
.swiper-wrap {
  height: 4.8rem;
  width: 100%;
  position: relative;
  z-index: 0!important;
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

</style>
