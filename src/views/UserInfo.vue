<template>
  <div>
    <nav-bar :imgSrc="model.user_img"></nav-bar>
    <img src="../assets/bannerTop_new.png" alt="背景" />
    <user-detail
      :name="model.name"
      :userImg="model.user_img"
      :userDesc="model.user_desc"
      :uid="model.id"
    ></user-detail>
  </div>
</template>

<script>
import navBar from '@/components/common/navBar.vue'
import userDetail from '@/components/userComponent/userDetail.vue'
export default {
  data () {
    return {
      model: {}
    }
  },
  components: {
    navBar,
    userDetail
  },
  async created () {
    // 根据用户id和token获取用户信息
    const { data: model } = await this.$http.get(
      `/user/${localStorage.getItem('id')}`
    )

    this.model = model[0]
  }
}
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 27.778vw;
  vertical-align: middle;
}
</style>
