<template>
  <div class="videoList" @click="$router.push(`/videoInfo/${videoList.id}`)">
    <div class="photo">
      <img :src="videoList.img" alt />
      <div class="shadow">
        <div class="icon-play2">
          <span>12138</span>
        </div>
        <div class="icon-file-text">
          <span>{{videoList.commentlen?videoList.commentlen:1024}}</span>
        </div>
      </div>
    </div>
    <p>{{videoList.name}}</p>
  </div>
</template>

<script>
export default {
  props: ['videoList']
}
</script>

<style lang="less" scoped>
.videoList {
  width: 46%;
  .photo {
    position: relative;
    .shadow {
      position: absolute;
      width: 100%;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      color: #fff;
      font-size: 3.611vw;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
      padding: 0 1.111vw;
      box-sizing: border-box;
      span {
          margin-left: 0.556vw;
      }
    }
  }
  img {
    width: 100%;
    height: 30vw;
    vertical-align: middle;
  }
  p {
    padding: 0;
    margin: 2.222vw 0;
    font-size: 3.611vw;
    // 文本两行溢出后省略号显示
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
