<template>
  <section class="topiclist" :id="'list-'+index">
  <span class="itemtitle" :id="'item-'+index">{{topiclist.title}}</span>
    <div class="project" v-for="(item,index) in topiclist.podItems" >

      <div class="newsitem" v-if="item.links[0].type == 'doc'" @click='toArticle(item.id ? item.id : item.links[0].url)'>
        <img v-if="item.thumbnail" :src="item.thumbnail" class="img"/>
        <div v-else class="none">暂无图片</div>
        <div class="cont">
          <span>{{item.title}}</span>
          <span class="time">{{item.updateTime}}</span>
          <span class="commentnum">{{item.commentCount}}</span>
        </div>
      </div>

      <div class="newslide" v-else-if="item.links[0].type == 'slide'" @click='toCarousel(item.id ? item.id : item.links[0].url)'>
        <div class="title">{{item.title}}</div>
        <div class="imgbox">
          <img v-for="img in item.thumbnails" class="img" :src="img"/>
        </div>
        <span class="commentnum">{{item.commentCount}}</span>
      </div>

      <div class="newsitem" v-if="item.links[0].type == 'video'" @click='toVideo(item.mp4 ? item.mp4 : item.links[0].url)'>
        <div class="video">
          <img v-if="item.thumbnail" :src="item.thumbnail" class="img video"/>
        </div>
        <div class="cont">
          <span>{{item.title}}</span>
          <span class="time">{{item.updateTime}}</span>
          <span class="commentnum">{{item.commentCount}}</span>
        </div>
      </div>

    </div>
  </section>

</template>

<script>
import {dealurl} from '@/config/mUtils'
export default {
  name: 'topiclist',
  data () {
    return {

    }
  },
  props: {
    topiclist: {
        type: Object,
        default: function () {
          return {}
        }
    },
    index:{
      type: Number,
    }
  },
  methods: {
    toArticle(url){
      this.$emit('toArticle',dealurl(url))
    },
    toCarousel(url){
      this.$emit('toCarousel',dealurl(url))
    },
    toVideo(url){
      this.$emit('toVideo',dealurl(url))
    },
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
      font-size:16px; /*px*/
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
    font-size:16px; /*px*/
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
    font-size:14px; /*px*/;
  }
  .commentnum{
    position: absolute;
    bottom: 0;
    right: 0;
    font-size:16px; /*px*/;
  }
  .time{
    position: absolute;
    bottom: 0;
    left: 0;
    font-size:16px; /*px*/;
  }
  .subtopic{
    position: absolute;
    bottom: 0;
    left: 0;
    font-size:16px; /*px*/;
    color: #fff;
    padding: 0.08rem 0.133333rem;
    background: red;
  }
}

.newslide{
  position: relative;
  border-bottom: 1px solid #eee;
  padding: 0px 0.4rem 0.533333rem;
  font-size:16px; /*px*/;
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
    font-size:12px; /*px*/;
  }
}

.videoitem{
  padding: 0.4rem;
  position: relative;
  .title{
    font-size:16px; /*px*/;
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
    font-size:16px; /*px*/;
  }
}
.itemtitle{
  display: block;
  margin: 0 0.266667rem;
  line-height: 1.2rem;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  color: #FF7256;
}
</style>
