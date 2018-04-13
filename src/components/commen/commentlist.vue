<template>
<div class="commentlist">
  <div class="comment-item" v-for="(item,index) in newcomment" :key="index">
    <div class="user">{{item.ip_from ? item.ip_from : item.client_ip}}<span>{{item.uname}}</span></div>
    <div class="contant">
      <div class="cont">{{item.comment_contents}}</div>
      <div class="parent" v-if="item.parent.length">
        <span class="parent-sub">--原评论：</span>{{item.parent[0].comment_contents}}
      </div>
    </div>
    <div class="other">
      <div class="time">{{item.comment_date}}</div>
      <div class="uptimes">顶{{item.uptimes}}</div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'commentlist',
  data () {
    return{

    }
  },
  props: {
    newcomment: {
        type: Array,
        default: function () {
          return []
        }
    },
  },

}
</script>

<style scoped lang="scss">
@import '../../style/mixin';
.commentlist{
  width:100%;
}
.comment-item{
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    padding: 20px;
    .user{
      font-size: 13px;/*px*/
      color: #666;
      margin-bottom: 10px;
      span{
        margin: 0 6px
      }
    }
    .contant{
      min-height: 100px;
      font-size: 15px;/*px*/
      height: auto;
      margin-bottom: 10px;
      .parent{
        border: 1px solid #ccc;
        color: #666;
        padding: 20px;
      }
      .parent-sub{
        margin-right: 6px
      }
    }
    .other{
      display: flex;
      justify-content: space-between;
      .time{
        font-size: 13px;/*px*/
        color: #666;
      }
      .uptimes{
        font-size: 15px;/*px*/
      }
    }
  }

</style>

