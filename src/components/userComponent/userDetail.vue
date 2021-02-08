<template>
  <div class="userDetail">
    <div>
      <div class="headImg">
        <img v-if="userImg" :src="userImg" alt="头像" />
        <img v-else src="../../assets/default_img.jpg" alt="头像" />
      </div>
      <div class="fansInfo">
        <div>
          <p>
            <span class="num">85462</span>
            <span>粉丝</span>
          </p>
          <p>
            <span class="num">0</span>
            <span>关注</span>
          </p>
          <p>
            <span class="num">65485</span>
            <span>获赞</span>
          </p>
        </div>
        <div class="editBtn" @click="toEdit" @touchstart="bgColor" @touchend="resetColor">编辑资料</div>
      </div>
    </div>
    <div>
      <h3>{{name}}</h3>
    </div>
    <div>
      <p v-if="userDesc">{{userDesc}}</p>
      <p v-else>这个人很懒，什么都没有留下</p>
      <div class="uid">
        <span v-if="isShow">uid:{{uid}}</span>
      </div>
      <div class="showUid" @click="showUid">{{isShowText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'userImg', 'userDesc', 'uid'],
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    showUid () {
      this.isShow = !this.isShow
    },
    // 跳转到个人信息编辑页
    toEdit () {
      this.$router.push('/edit')
    },
    bgColor (e) {
      e.target.style.backgroundColor = '#ff9db5'
      e.target.style.color = '#fff'
    },
    resetColor (e) {
      e.target.style = ''
    }
  },
  computed: {
    isShowText () {
      if (this.isShow) {
        return '收起'
      }
      return '展开'
    }
  }
}
</script>

<style lang="less" scoped>
.userDetail {
  padding: 0 3.333vw;
  background-color: #fff;
  div:nth-child(1) {
    display: flex;
    .headImg {
      position: relative;
      width: 22.222vw;
      height: 22.222vw;
      margin-right: 5.556vw;
      img {
        position: absolute;
        top: -2.222vw;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .fansInfo {
      flex: 1;
      display: flex;
      flex-direction: column;
      p {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 3.333vw;
        &:nth-child(2) {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.278vw;
            height: 4.167vw;
            background-color: #ccc;
          }
          &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0.278vw;
            height: 4.167vw;
            background-color: #ccc;
          }
        }
        span {
          flex: 1;
          color: #aaa;
          &.num {
            font-size: 4.444vw;
            color: #333;
          }
        }
      }
      .editBtn {
        height: 9.167vw;
        line-height: 9.167vw;
        text-align: center;
        border: 0.278vw solid #ff9db5;
        border-radius: 1.389vw;
        color: #ff9db5;
        font-size: 4.444vw;
      }
    }
  }
  div:nth-child(2) {
    h3 {
      font-weight: 500;
      margin: 2.778vw 0;
    }
  }
  div:nth-child(3) {
    position: relative;
    p {
      font-size: 3.333vw;
      color: #999;
      margin: 0;
    }
    .uid {
      padding: 1.389vw 0;
      span {
        font-size: 3.333vw;
        color: rgb(39, 38, 38);
        padding: 0 0.556vw;
        background-color: rgb(236, 234, 234);
      }
    }
    .showUid {
      position: absolute;
      right: 1.389vw;
      top: 0.556vw;
      font-size: 3.333vw;
      color: #1389bf;
    }
  }
}
</style>
