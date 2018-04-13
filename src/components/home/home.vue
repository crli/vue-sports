<template>
  <div class="home">

    <swiper :options="swiperOption" class="swiper-wrap" v-if="swiper.length">
      <swiper-slide v-for="(item,index) in swiper" :key="index"  v-if="item.type!='web'">
        <span class="title">{{item.title}}</span>
        <img :src="item.thumbnail" alt="" @click="toCarousel(item.id)"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-if="swiper.length>1"></div>
    </swiper>

    <section class="topicbox">
      <div class="category" v-for="(item,index) in topic.item" @click="toTopic(item.id)" :key="index">
        <img :src="item.thumbnail" />
        <span class="title">{{item.title}}</span>
      </div>
    </section>

    <section class="project-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <newslist
      :newslist = "news.item"
      @toCarousel = "toCarousel"
      @toArticle = "toArticle"
      @toVideo = "toVideo"
      @toTopic = "toTopic">
      </newslist>
    </section>

    <loading :loadernone="loadernone"></loading>

    <transition name="backtop">
      <div class="to-top" @click="backTop" v-if="showBackStatus"></div>
    </transition>
    <transition :name="transitionName" >
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
import {getnews} from '@/service/getData'
import {dealurl,showBack,animate} from '@/config/mUtils'
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
      showBackStatus:false,
      transitionName:'router-slide'
    }
  },
  created(){
    this.init();
  },
  mounted(){
    showBack(status => {
      this.showBackStatus = status;
    })
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
    },
    toArticle(params){
      this.$router.push('/home/article?'+params)
    },
    toVideo(params){
      this.$router.push('/home/video?'+params)
    },
    toTopic(params){

      this.$router.push('/topic?'+dealurl(params))
    },
    backTop(){
      animate(document.body, {scrollTop: '0'}, 400,'ease-out');
    },
  },
  watch: {
    '$route' (to, from) {
      this.transitionName = to.path.indexOf("video")>0 ? 'router-right' : 'router-slide'
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
  height: 360px;
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
      font-size:16px; /*px*/
      color: #fff;
  }
}
.topicbox{
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
    font-size:16px; /*px*/
  }
}
.to-top{
  position: fixed;
  top: 80%;
  left: 90%;
  transform: translate(-80%, -90%);
  width:1rem;
  height:1rem;
  background:url('../../assets/img/top.png')no-repeat;
  background-size: 100% 100%;
  background-color: #fff;
  border-radius: 1rem;
}
</style>
