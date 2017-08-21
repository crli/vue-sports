<template>
  <!-- <router-view></router-view> -->
  <div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @import './style/common';
  @import './assets/fonts/iconfont.css';
</style>
