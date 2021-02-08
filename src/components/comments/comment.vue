<template>
  <div class="comment">
    <div class="comment_title">
      评论
      <span>({{commentNum}})</span>
    </div>
    <div class="comment_imput">
      <div class="img">
        <img v-if="!userInfo.user_img" src="@/assets/default_img.jpg" alt />
        <img v-else :src="userInfo.user_img" alt />
      </div>
      <div v-if="isReply" class="reply" @click="cancelReply">
        回复@{{toName}}
        <van-icon name="cross" />
      </div>
      <div class="ipt">
        <input id="comment_id" type="text" v-model="comment_content" placeholder="说点什么吧~" />
      </div>
      <div class="btn" @click="publish">
        <button>{{btnText}}</button>
      </div>
    </div>
    <lazy-component>
      <comment-list
        v-for="(item,index) in commentList"
        :key="index"
        :comment-list="item"
        v-lazy="item"
        @replyPlush="replyHandle($event)"
      ></comment-list>
    </lazy-component>
  </div>
</template>

<script>
import commentList from '@/components/comments/commentList.vue'
export default {
  data () {
    return {
      // 用户信息
      userInfo: {},
      // 评论内容
      comment_content: '',
      // 评论列表数据
      commentList: [],
      // 评论数据条数
      commentNum: 0,
      // 是否处于回复状态
      isReply: false,
      // 回复给谁
      toName: '',
      // 回复评论父id
      parent_id: null
    }
  },
  created () {
    this.getUserInfo()
    this.getComment()
  },
  computed: {
    btnText () {
      if (this.isReply) {
        return '回复'
      }
      return '发表'
    }
  },
  methods: {
    // 获取登录用户的信息
    async getUserInfo () {
      if (localStorage.getItem('token')) {
        // 用户已经登录
        const { data: res } = await this.$http.get(
          `/user/${localStorage.getItem('id')}`
        )
        this.userInfo = res[0]
      }
    },
    // 获取评论列表
    async getComment () {
      const { data: res } = await this.$http.get(
        `/comment/${this.$route.params.id}`
      )
      this.commentNum = res.length
      this.$emit('commentNum', this.commentNum)
      // 改造数据 变成树形结构
      const newArr = this.changeCommentData(res, null)
      this.commentList = newArr
    },
    // 把评论数据改造成树形结构
    changeCommentData (arr, id) {
      const newArr = []
      // 遍历评论数据
      for (let i = 0; i < arr.length; i++) {
        // 将parentID为空字符串的改为null
        arr[i].parent_id = arr[i].parent_id ? arr[i].parent_id : null
        if (arr[i].parent_id === id) {
          // 如果父id等于评论id 就加到newArr中
          newArr.push(arr[i])
          // parent_id是字符串，comment_id是数字 需要转换类型
          const num = String(arr[i].comment_id)
          // 递归筛选子级评论
          arr[i].children = this.changeCommentData(arr, num)
        }
      }
      return newArr
    },
    // 发表评论
    async publish () {
      if (!(localStorage.getItem('id') && localStorage.getItem('token'))) {
        this.$msg.fail('请先登录！')
        return
      }
      if (this.comment_content.trim().length === 0) {
        this.$msg.fail('评论不能为空！')
        return
      }
      // 获取日期
      const date = new Date()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
      const commentDate = m + '-' + d
      // 发表评论请求参数模型
      const publishModel = {
        comment_date: commentDate,
        comment_content: this.comment_content,
        article_id: this.$route.params.id,
        parent_id: this.parent_id
      }
      const res = await this.$http.post(
        '/comment_post/' + localStorage.getItem('id'),
        publishModel
      )

      if (res.data.msg) {
        // 新增评论失败
        this.$msg.fail(res.data.msg)
        return
      }
      // 清空内容
      this.comment_content = ''
      this.parent_id = null
      // 取消回复状态
      if (this.isReply) {
        this.cancelReply()
      }
      this.$msg.success('评论发表成功！')
      // 刷新评论列表
      this.getComment()
    },
    // 回复评论
    replyHandle (comment) {
      document.querySelector('#comment_id').focus()
      this.parent_id = comment.comment_id
      this.isReply = true
      this.toName = comment.userinfo.name
    },
    // 取消回复状态
    cancelReply () {
      this.isReply = false
      this.toName = ''
      this.parent_id = null
    }
  },
  components: {
    commentList
  }
}
</script>

<style lang="less" scoped>
.comment {
  padding: 2.222vw;
  font-size: 4.444vw;
  .comment_title {
    span {
      color: #aaa;
    }
  }
  .comment_imput {
    display: flex;
    align-items: center;
    margin-top: 4.167vw;
    .img {
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .ipt {
      flex: 1;
      margin: 0 2.222vw;
      input {
        width: 90%;
        height: 7.778vw;
        padding: 0 2.778vw;
        font-size: 3.333vw;
        background-color: #f4f4f4;
        color: #999;
        border-radius: 3.889vw;
        outline: none;
        border: 0;
        &::-webkit-input-placeholder {
          color: #999;
        }
        &::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #999;
        }
        &:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #999;
        }
        &:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #999;
        }
      }
    }
    .btn {
      button {
        width: 13.889vw;
        height: 8.333vw;
        border: 0;
        background-color: #ff9db5;
        color: #fff;
        font-size: 3.889vw;
      }
    }
    .reply {
      color: #999;
      font-size: 3.333vw;
      background-color: #f4f4f4;
      margin-left: 1.389vw;
      border-radius: 4.444vw;
      .van-icon {
        background-color: #ff9db5;
        color: #fff;
        border-radius: 50%;
      }
    }
  }
}
</style>
