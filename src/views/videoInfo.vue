<template>
  <div class="videoInfo" v-if="model.category">
    <nav-bar></nav-bar>
    <div class="videoPlay">
      <video :src="model.content" width="100%" controls></video>
    </div>
    <div class="videoDetail">
      <van-collapse v-model="activeNames">
        <van-collapse-item name="videoTitle">
          <template v-slot:title>
            <div class="title">
              <span>{{model.category.title}}</span>
              <span>{{model.name}}</span>
            </div>
            <div class="author">
              <div class="up">
                up:{{model.userinfo?model.userinfo.name:'匿名'}}
                <span
                  class="focus"
                  @click.stop="onFocus"
                >{{focusText}}</span>
              </div>
              <div class="playNum">
                <div>
                  <span>12138</span>次观看
                </div>
                <div>
                  <span>1024</span>弹幕
                </div>
                <div>{{model.date}}</div>
              </div>
            </div>
          </template>
          恭喜你，发现了宝藏！
        </van-collapse-item>
      </van-collapse>
      <div class="btns">
        <div class="left">
          <div :class="{collection:isCollection}" @click="onCollection">
            <van-icon name="star" />
            <span>收藏</span>
          </div>
          <div>
            <i class="icon-box-add"></i>
            <span>缓存</span>
          </div>
          <div>
            <van-icon name="share" />
            <span>分享</span>
          </div>
        </div>
        <div class="right">
          <div>
            <i class="icon-bubble"></i>
            <span>{{commentLen}}评论</span>
          </div>
        </div>
      </div>
      <div class="commend">
        <div class="like" @click="refreshCommentList">
          <span>猜你喜欢</span>
          <van-icon v-if="!loading" name="replay" />
          <van-loading v-else size="16" color="#666" />
        </div>
        <div class="videoPanel">
          <video-list v-for="(item,index) in commendList" :key="index" :videoList="item"></video-list>
        </div>
      </div>
      <comment @commentNum="len=>commentLen=len"></comment>
    </div>
    <div class="zero" v-if="commentLen===0">空空如也~~~</div>
  </div>
</template>

<script>
import navBar from '@/components/common/navBar.vue'
import videoList from '@/views/VideoList.vue'
import comment from '@/components/comments/comment.vue'
export default {
  data () {
    return {
      // 当前视频信息
      model: {},
      // 折叠面板
      activeNames: [],
      // 个性推荐视频列表
      commendList: [],
      // 刷新加载中图标
      loading: false,
      // 猜你喜欢刷新防抖
      timer: null,
      commentLen: 0,
      // 是否收藏了视频
      isCollection: false,
      // 是否关注了up主
      isFocus: false
    }
  },
  created () {
    this.getArticle()
    this.getCommendList()
    this.hasCollection()
  },
  components: {
    navBar,
    videoList,
    comment
  },
  methods: {
    //   获取视频信息
    async getArticle () {
      const { data: res } = await this.$http.get(
        `/article/${this.$route.params.id}`
      )
      this.model = res[0]
      // 检测是否关注了up
      this.hasFocus()
    },
    // 获取个性化推荐视频列表
    async getCommendList () {
      const { data: res } = await this.$http.get('/commend')
      console.log(res)
      this.commendList = res
      this.loading = false
    },
    // 刷新个性化视频列表
    refreshCommentList () {
      clearTimeout(this.timer)
      this.loading = true
      this.timer = setTimeout(() => {
        this.getCommendList()
      }, 1000)
    },
    // 收藏视频
    async onCollection () {
      if (!(localStorage.getItem('id') && localStorage.getItem('token'))) {
        this.$msg.fail('请先登录！')
        return
      }

      const { data: res } = await this.$http.post(
        `/collection/${localStorage.getItem('id')}`,
        {
          article_id: this.model.id
        }
      )
      this.isCollection = res.msg === '收藏成功'
      this.$msg.success(res.msg)
    },
    // 检测是否收藏了该视频
    async hasCollection () {
      if (localStorage.getItem('id') && localStorage.getItem('token')) {
        // 只有用户处于登录状态才检测
        const { data: res } = await this.$http.get(
          `/collection/${localStorage.getItem('id')}`,
          {
            params: {
              article_id: this.$route.params.id
            }
          }
        )
        this.isCollection = res.success
      }
    },
    // 关注up主
    async onFocus () {
      if (!(localStorage.getItem('id') && localStorage.getItem('token'))) {
        this.$msg.fail('请先登录！')
        return
      }

      const { data: res } = await this.$http.post(
        `/sub_scription/${localStorage.getItem('id')}`,
        {
          sub_id: this.model.userid
        }
      )
      this.isFocus = res.msg === '关注成功'
      this.$msg.success(res.msg)
    },
    // 检测是否关注up
    async hasFocus () {
      if (localStorage.getItem('id') && localStorage.getItem('token')) {
        // 只有用户处于登录状态才检测
        const { data: res } = await this.$http.get(
          `/sub_scription/${localStorage.getItem('id')}`,
          {
            params: {
              sub_id: this.model.userid
            }
          }
        )
        this.isFocus = res.success
      }
    }
  },
  watch: {
    //   监听路由地址动态id变化，刷新页面重新发送请求
    $route () {
      window.location.reload(true)
      //   返回顶部
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  computed: {
    // 是否关注了up主
    focusText () {
      if (this.isFocus) {
        return '已关注'
      }
      return '关注'
    }
  }
}
</script>

<style lang="less" scoped>
.videoInfo {
  background-color: #fff;
  .videoDetail {
    .title {
      span:first-child {
        display: inline-block;
        padding: 0 2.222vw;
        color: #ff9db5;
        background-color: rgb(247, 247, 247);
        border-radius: 3.333vw;
        font-size: 3.333vw;
        margin-right: 1.389vw;
      }
      span:last-child {
        font-size: 3.889vw;
        vertical-align: middle;
        line-height: 6.667vw;
      }
    }
    .author {
      display: flex;
      margin-top: 1.389vw;
      .up {
        flex: 1;
        font-size: 3.333vw;
        .focus {
          display: inline-block;
          width: 13.889vw;
          line-height: 6.111vw;
          text-align: center;
          color: #fff;
          background-color: #ff9db5;
          font-size: 3.333vw;
        }
      }
      .playNum {
        flex: 3;
        display: flex;
        font-size: 3.333vw;
        color: #999;
        div {
          flex: 1;
        }
      }
    }
    .btns {
      display: flex;
      color: #999;
      padding: 0.556vw 4.167vw;
      span {
        font-size: 3.333vw;
        margin: 0 4.167vw 0 1.389vw;
      }
      .van-icon,
      i {
        font-size: 5vw;
      }
      .left {
        flex: 4;
        display: flex;
        div {
          display: flex;
          align-items: center;
        }
        .collection {
          color: #ff9db5;
        }
      }
      .right {
        div {
          display: flex;
          align-items: center;
        }
      }
    }
    .videoPanel {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 1.389vw;
    }
    .like {
      display: flex;
      align-items: center;
      margin: 5.556vw 4.167vw 1.389vw;
      font-size: 3.889vw;
      color: #999;
      i {
        font-size: 4.444vw;
        margin-left: 0.556vw;
      }
    }
  }
  .zero {
    height: 27.778vw;
    color: #aaa;
    font-size: 3.889vw;
    text-align: center;
    line-height: 27.778vw;
  }
}
</style>
