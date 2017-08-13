<template>
    <section id='head' class="head-other">
      <div class="head-back"><i class="iconfont icon-back" @click="routerto"></i></div>
      <div class="head-title">{{headTitle}}</div>
      <div class="head-back"></div>
    </section>
</template>

<script>
    export default {
      name:'head',
      data () {
        return {
        }
      },
      props: ['headTitle'],
      methods: {
        routerto(){
          this.$router.go(-1)
        },

      }
    }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .head-other{
    background:#000;
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    @include wh(100%, 1.093333rem);
    line-height: 1.093333rem;
    display: flex;
    .head-back{
      position: relative;
      @include wh(1.093333rem, 1.093333rem);
      i{
        color:#fff;
        @include center;
        @include font-dpr(16px);
      }
    }
    .head-title{
      flex: 1;
      height:1.093333rem;
      text-align: center;
      color:#fff;
      @include ellipsis(1);
      @include font-dpr(16px);
    }
  }
</style>
