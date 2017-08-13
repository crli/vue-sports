<template>
  <div class="loading">
    <div class="loader-more" v-show="!loadernone">正在加载更多...</div>
    <div class="loader-none" v-show="loadernone">已经全部加载完毕</div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {

    }
  },
  props: {
    loadernone: {
        type: Boolean,
        default: false
    },
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
