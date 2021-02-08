<template>
  <div class="comment_list">
    <div class="comment_panel">
      <div class="left">
        <img v-if="!commentList.userinfo.user_img" src="@/assets/default_img.jpg" alt />
        <img v-else :src="commentList.userinfo.user_img" alt />
      </div>
      <div class="right">
        <div class="header">
          <div v-if="commentList.userinfo.name">{{commentList.userinfo.name}}</div>
          <div v-else>匿名</div>
          <div>{{commentList.comment_date}}</div>
        </div>
        <div class="content">{{commentList.comment_content}}</div>
        <div class="reply" @click="replyPlush(commentList)">回复</div>
      </div>
    </div>
    <div v-if="commentList.children.length>0" class="commentChildren">
      <comment-child
        v-for="(item,index) in commentList.children"
        :key="index"
        :children="item"
        @childrenReply="replyPlush($event)"
      ></comment-child>
    </div>
  </div>
</template>

<script>
import commentChild from '@/components/comments/commentChild.vue'
export default {
  props: ['commentList'],
  components: {
    commentChild
  },
  methods: {
    replyPlush (comment) {
      this.$emit('replyPlush', comment)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/commentPanel.less';

.comment_list {
  border-bottom: 1px solid #ccc;
  .commentChildren {
    padding: 0 5.556vw;
  }
  .comment_panel {
    .comment_panel;
  }
}
</style>
