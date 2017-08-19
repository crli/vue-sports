<template>
  <div class="comment">
    <headTop :headTitle="titleName"></headTop>
    <div class="box">

    </div>

  </div>

</template>

<script>
  import headTop from '@/components/commen/head'
  import {newcomment,hotcomment} from '@/service/getData'
  export default {
  name: 'comment',
  data () {
    return {
      titleName:'',
      newpage:1,
      lastcount:'',
      count:'',
      hotcomment:[],
      newcomment:[],
      hasMore:true
    }
  },
  created(){
    this.init();
    document.body.setAttribute("class","hid");
  },
  methods: {
    async init() {
      let url = this.$route.query.url;
      this.titleName = this.$route.query.title;
      let response = await newcomment(this.newpage,url);
      this.newcomment = response.data.comments
      this.count = response.data.count
      if(this.count<20){
        this.hasMore = false
      }

      response = await hotcomment(1,url);
      this.hotcomment = response.data.comments.slice(0,10)
    }
  },
  components:{headTop},

}
</script>

<style scoped lang="scss">
@import '../../style/mixin';
.comment{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 2;
  background-color: #fff;
  overflow: auto;
  .box{
    width:100%;
    height:100%;
    overflow: auto;
    padding-top: 1.093333rem;
  }
}

</style>
