<template>
  <div class="topic" >
    <headTop :headTitle="titleName" class="zindex1"></headTop>
    <div class="box"id="topicid">
      <div v-for="(item ,index) in subjects">

        <div class="mutiTitle" v-if="item.view=='multiTitle'">
          <img :src="item.content.bgImage"/>
        </div>

        <div class="text" v-else-if="item.view=='text'">
          <span>{{item.content.intro}}</span>
        </div>

        <div class="slider" v-else-if="item.view=='slider'">
          <swiper :options="swiperOption" class="swiper swiper-wrap">
            <swiper-slide v-for="(ele,i) in item.podItems" :key="i">
              <span class="title">{{ele.title}}</span>
              <img :src="ele.thumbnail" alt=""  @click="toWhere(ele)"/>
            </swiper-slide>
          </swiper>
        </div>

        <div class="newslist" v-else >
          <topiclist
            :topiclist = "item"
            :index = 'index'
            @toCarousel = "toCarousel"
            @toArticle = "toArticle"
            @toVideo = "toVideo">
          </topiclist>
        </div>
        <div class="subtitle" v-if="index == 2" >
          <a href="javascript:;" class="subnav" v-for="ele in havetitle" @click="toitem('item-'+ele.i)">{{ele.title}}</a>
        </div>

      </div>
      <transition name="backtop">
        <div class="to-top" @click="backTop" v-if="showBackStatus"></div>
      </transition>
      <transition name="router-slide">
        <router-view></router-view>
      </transition>
    </div>
  </div>

</template>

<script>
  import topiclist from '@/components/commen/topiclist'
  import headTop from '@/components/commen/head'
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import {getarticle} from '@/service/getData'
  import {getUrl,dealurl,animate,getOuterHeight,showBack} from '@/config/mUtils'
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
      showBackStatus:false
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

      let response = await getarticle(getUrl(this.$route.query));

      this.subjects = response.data.body.subjects;
      this.subjects.forEach((ele,index)=>{
        ele.i = index
      })
      this.havetitle = this.subjects.filter((ele)=>{
        return ele.title
      })
    },

    toitem(id){
      var anchor = document.getElementById(id);
      let ele = document.getElementById('list-' + id.split("-")[1]);
      let eleHeight = getOuterHeight(ele);
      let clientHeight = document.documentElement.clientHeight;
      let top = anchor.offsetTop - getOuterHeight(anchor)
      if(eleHeight<clientHeight){
        top = top - (clientHeight - eleHeight)
      }
      animate(document.body, {scrollTop: top}, 300,'ease-out');
    },

    toCarousel(params){
      if(params.indexOf(".com/")>0){
        this.$router.push('/topic/carousel?'+dealurl(params))
      }else{
        this.$router.push('/topic/carousel?'+params)
      }
    },

    toArticle(params){
      this.$router.push('/topic/article?'+params)
    },

    toVideo(params){
      this.$router.push('/topic/video?'+params)
    },
    toWhere(ele){
      if(ele.links[0].type === 'slide'){
        this.toCarousel(ele.links[0].url)
      }else if(ele.links[0].type === 'video'){
        this.toVideo(dealurl(ele.mp4))
      }
    },
    backTop(){
      animate(document.body, {scrollTop: '0'}, 400,'ease-out');
    },
  },

  components:{swiper, swiperSlide,headTop,topiclist},
  watch:{
    '$route' (to, from) {
      if(to.path == '/topic' && from.path == '/topic/carousel'){
        this.init()
      }
      if(to.path == '/topic'){
       document.body.scrollTop = 0;
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/mixin';

.topic{
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
      height: 2rem;
  }
}
.text{
  margin: 0.8rem;
  display: block;
  font-size:16px; /*px*/;
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
      font-size:18px; /*px*/;
      color: #fff;
  }
}

.subtitle{
  margin: 0.8rem 0.266667rem;
  .subnav{
    display:inline-block;
    padding: 0.133333rem 0.266667rem;
    border: 1px solid #eee;
    font-size:14px; /*px*/;
    margin: 0.133333rem ;
    border-radius: 0.266667rem;
    color:#FF7256;
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
