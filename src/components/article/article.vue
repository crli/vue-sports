<template>
  <div class="wrap":class="this.$route.path.indexOf('topic')>0?'zindex1':''">
    <headTop :headTitle="titleName" class="zindex1"></headTop>
    <div class="box">
      <div class="article">
        <div class="title">{{datas.title}}</div>
        <div class="sourcetime">
          <span>{{datas.updateTime}}</span><span class="source">{{datas.source}}</span>
        </div>
        <div class="content htmlbox" v-html="datas.text">

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import headTop from '@/components/commen/head'
  import {getarticle} from '@/service/getData'
  import {getUrl} from '@/config/mUtils'
  export default {
  name: 'article',
  data () {
    return {
      titleName:'文章',
      datas:{},
      y:0
    }
  },
  created(){
    this.init();
    this.y = document.body.scrollTop
    document.body.setAttribute("class","hid");
  },
  destroyed(){
    document.body.removeAttribute("class","hid");
    document.body.scrollTop = this.y
  },
  methods: {
    async init() {
      let response = await getarticle(getUrl(this.$route.query));
      this.datas = response.data.body;
    },
  },
  components:{headTop},

}
</script>

<style scoped lang="scss">
@import '../../style/mixin';

.wrap{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 0;
  background-color: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .box{
    width:100%;
    height:100%;
    overflow: auto;
    padding-top: 1.093333rem;
    -webkit-overflow-scrolling: touch;
  }
  .title, .sourcetime{
    padding: 0 0.266667rem;
  }
  .title{
    font-size:17px; /*px*/
    font-weight: bold;
  }
  .sourcetime{
    font-size:12px; /*px*/
    color: #666;
    margin: 0.266667rem 0;
    .source{
      margin-left: 0.133333rem
    }
  }
  .content{
    padding: 0 0.133333rem;
    margin:0 0.066667rem;
    font-size:15px; /*px*/
    color:#666;
    line-height:1.6;
  }


}

</style>
