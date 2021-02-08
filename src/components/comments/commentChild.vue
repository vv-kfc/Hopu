<template>
  <div class="comment_child">
    <div class="comment_panel">
      <div class="left">
        <img v-if="!children.userinfo.user_img" src="@/assets/default_img.jpg" alt />
        <img v-else :src="children.userinfo.user_img" alt />
      </div>
      <div class="right">
        <div class="header">
          <div>{{children.userinfo.name}}</div>
          <div>{{children.comment_date}}</div>
        </div>
        <div v-if="parentname" class="content">
          回复
          <span style="color:skyblue">@{{parentname}}：</span>
          {{children.comment_content}}
        </div>
        <div v-else class="content">{{children.comment_content}}</div>
        <div class="reply" @click="childrenReply(children)">回复</div>
      </div>
    </div>
    <commentChildren
      v-for="(item,index) in children.children"
      :key="index"
      :children="item"
      :parentname="item.parent_user_info.name"
      @childrenReply="childrenReply($event)"
    ></commentChildren>
  </div>
</template>

<script>
export default {
  props: ['children', 'parentname'],
  name: 'commentChildren',
  methods: {
    childrenReply (children) {
      this.$emit('childrenReply', children)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/commentPanel.less';
.comment_child {
  .comment_panel {
    .comment_panel;
  }
}
</style>
