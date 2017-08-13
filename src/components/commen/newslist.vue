<template>
  <section class="newslist">
    <div class="project" v-for="(item,index) in newslist" >
        <div class="newsitem" v-if="item.type=='doc'" @click='toArticle(item.id)'>
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

        <div class="newslide" v-else-if="item.type=='slide'" @click='toCarousel(item.id)'>
          <div class="title">{{item.title}}</div>
          <div class="imgbox">
            <img v-for="img in item.style.images" class="img" :src="img"/>
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

</template>

<script>
import {dealurl} from '@/config/mUtils'
export default {
  name: 'newslist',
  data () {
    return {

    }
  },
  props: {
    newslist: {
        type: Array,
        default: function () {
          return []
        }
    },
  },
  methods: {
    toArticle(url){
    },
    toCarousel(url){
      this.$emit('toCarousel',dealurl(url))
    }
  }
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
