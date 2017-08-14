<template>
  <div class="topic">
    <headTop :headTitle="titleName"></headTop>
    <div class="box">
      <template v-for="(item ,index) in subjects">

        <div class="mutiTitle" v-if="item.view=='multiTitle'">
          <img :src="item.content.bgImage"/>
        </div>

        <div class="text" v-if="item.view=='text'">
          <span>{{item.content.intro}}</span>
        </div>

        <div class="slider" v-if="item.view=='slider'">
          <swiper :options="swiperOption" class="swiper swiper-wrap">
            <swiper-slide v-for="(ele,i) in item.podItems" :key="i">
              <span class="title">{{ele.title}}</span>
              <img :src="ele.thumbnail" alt=""  @click="toCarousel(ele.id ? ele.id : ele.links[0].url)"/>
            </swiper-slide>
          </swiper>
        </div>

        <div class="subtitle" v-if="index == 2" >
          <span class="subnav" v-for="(ele,j) in havetitle" @click="toitem(j)">{{ele.title}}</span>
        </div>

      </template>
      <transition name="router-slide">
        <router-view></router-view>
      </transition>
    </div>
  </div>

</template>

<script>
  import headTop from '@/components/commen/head'
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {getarticle} from '@/service/getData'
  import {getUrl,dealurl} from '@/config/mUtils'
  export default {
  name: 'topic',
  data () {
    return {
      titleName:'专题',
      subjects:[],
      havetitle:[],
      swiperOption: {
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
    document.body.setAttribute("class","hid");
    this.init();
  },
  destroyed(){
    document.body.removeAttribute("class","hid");
  },
  methods: {
    async init() {

      let response = await getarticle(getUrl(this.$route.query));

      this.subjects = response.data.body.subjects;

      this.havetitle = this.subjects.filter((ele)=>{
        return ele.title
      })
    },

    toitem(id){
      console.log(id)
    },

    toCarousel(params){
      if(params.indexOf(".com/")>0){
        this.$router.push('/home/topic/carousel?'+dealurl(params))
      }else{
        this.$router.push('/home/topic/carousel?'+params)
      }
    },

    toArticle(params){
      this.$router.push('/home/article?'+params)
    },

    toVideo(params){
      this.$router.push('/home/video?'+params)
    }
  },
  components:{swiper, swiperSlide,headTop}
}
</script>

<style scoped lang="scss">
@import '../../style/mixin';
.topic{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 0;
  background-color: #fff;
  overflow: auto;
  .box{
    width:100%;
    height:100%;
    overflow: auto;
    padding-top: 1.093333rem;
  }
}
.mutiTitle{
  width: 100%;
    img{
      width: 100%;
      height: 2.666667rem;
  }
}
.text{
  margin: 0.8rem;
  display: block;
  @include font-dpr(16px);
}

.swiper {
  height: 5.6rem;
  width: 100%;
  position: relative;
  img{
    width:100%;
    height:100%
  }
  .title{
      position: absolute;
      bottom: 0px;
      left: 0.266667rem;
      @include font-dpr(18px);
      color: #fff;
  }
}

.subtitle{
  margin: 0.8rem 0.266667rem;
  .subnav{
    display:inline-block;
    padding: 0.133333rem 0.266667rem;
    border: 1px solid #eee;
    @include font-dpr(14px);
    margin: 0.133333rem ;
    border-radius: 0.266667rem;
    color:#FF7256;
  }
}

</style>
