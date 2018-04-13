<template>
  <div class="comment">
    <headTop :headTitle="titleName"></headTop>
    <div class="box">
      <section class="hot-box">
        <div class="hot" v-if="hotcomment.length">热门评论</div>
        <div class="comment-item" v-for="(item,index) in hotcomment" :key="index">
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
      </section>

      <section class="new-box">
        <div class="hot" v-if="newcomment.length">最新评论</div>
        <section class="project-list1"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
          <commentlist
          :newcomment = "newcomment">
          </commentlist>
        </section>
      </section>

      <section v-if="!newcomment.length">
        <div class="hot">暂无内容</div>
      </section>

      <loading :loadernone="loadernone"></loading>
    </div>
  </div>
</template>

<script>
  import commentlist from '@/components/commen/commentlist'
  import loading from '@/components/commen/loading'
  import headTop from '@/components/commen/head'
  import {newcomment,hotcomment} from '@/service/getData'
  import infiniteScroll from 'vue-infinite-scroll'
  export default {
  name: 'comment',
  data () {
    return {
      titleName:'',
      page:1,
      url:'',
      count:'',
      hotcomment:[],
      newcomment:[],
      busy: true,
      loadernone:false,//没有数据提示
    }
  },
  created(){
    document.body.removeAttribute("class","hid");
    this.init();
  },

  methods: {
    async init() {
      this.url = this.$route.query.url;
      this.titleName = this.$route.query.title;

      let response = await hotcomment(1,this.url);
      this.hotcomment = response.data.comments.slice(0,10)

      response = await newcomment(this.page++,this.url);
      this.newcomment = response.data.comments
      this.count = response.data.count
      this.busy = false;
      if(this.count <= 20){
        this.busy = true;
        this.loadernone = true;
        return false
      }

    },
    async loadMore(){
      this.busy = true;
      this.loadernone = false;
      let response = await newcomment(this.page,this.url)
      this.newcomment = [...this.newcomment, ...response.data.comments];
      if (response.data.comments.length < 20) {
        this.loadernone = true;
        return false
      }
      this.busy = false;
    }
  },
  directives: {infiniteScroll},
  components:{headTop,commentlist,loading }
}
</script>

<style scoped lang="scss">
@import '../../style/mixin';
.comment{
  background-color: #fff;
  .box{
    width:100%;
    height:100%;

    padding-top: 1.093333rem;
  }
  .hot{
    padding: 20px;
    font-size: 18px;/*px*/
    color: #FF7256;
    margin-top: 40px
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
}

</style>
