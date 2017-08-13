<template>
  <div class="carousel">
    <headTop :headTitle="titleName"></headTop>
    <div class="box">
      <video :src="type" controls="controls" class="video"></video>
    </div>
  </div>

</template>

<script>
  import headTop from '@/components/commen/head'
  import {videoitem} from '@/service/getData'
  export default {
  name: 'article',
  data () {
    return {
      titleName:'视频',
      type:''
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
      let query = this.$route.query;
      if(query.type){
        this.type = query.type
      }else if(query.video){
        let response = await videoitem(query.video);
        this.type = response.data.singleVideoInfo[0].videoURLMid
      }
    },
  },
  components:{headTop}
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
  z-index: 0;
  background-color: #000;
  overflow: auto;
  .box{
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
  }
  .video{
    @include wh(100%,7.0rem)
  }
}

</style>
