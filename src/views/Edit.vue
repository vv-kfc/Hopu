<template>
  <div class="edit">
    <nav-bar style="margin-bottom:4.167vw;" :imgSrc="model.user_img"></nav-bar>
    <edit-banner left="头像" :bottom="bottom">
      <template v-slot:imgSrc>
        <van-uploader :after-read="afterRead">
          <template v-slot:default>
            <img v-if="!model.user_img" src="@/assets/default_img.jpg" alt="默认头像" />
            <img v-else :src="model.user_img" alt="头像" />
          </template>
        </van-uploader>
      </template>
    </edit-banner>
    <edit-banner left="昵称" :bottom="bottom" @showEditDialog="openEditDialog">
      <template v-slot:content>{{model.name}}</template>
    </edit-banner>
    <edit-banner left="UID" :bottom="bottom">
      <template v-slot:content>{{model.id}}</template>
    </edit-banner>
    <edit-banner left="性别" :bottom="bottom" @showEditDialog="showGender=true">
      <template v-slot:content>{{model.gender==='1'?'女':'男'}}</template>
    </edit-banner>
    <edit-banner left="账号" :bottom="bottom">
      <template v-slot:content>{{model.username}}</template>
    </edit-banner>
    <edit-banner left="个性签名" @showEditDialog="openEditDialog">
      <template v-slot:content>{{userDesc}}</template>
    </edit-banner>
    <div class="btns">
      <div class="back" @click="$router.push('/userinfo')">返回空间</div>
      <div @click="loginOut">退出登录</div>
    </div>
    <edit-dialog ref="editDialogRef" :title="title" @confirm="saveContent"></edit-dialog>
    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="selectGender"
    />
  </div>
</template>

<script>
import navBar from '@/components/common/navBar.vue'
import editBanner from '@/components/common/editBanner.vue'
import editDialog from '@/components/common/editDialog.vue'
export default {
  async created () {
    // 根据用户id和token获取用户信息
    const { data: model } = await this.$http.get(
      `/user/${localStorage.getItem('id')}`
    )

    this.model = model[0]
  },
  data () {
    return {
      model: {},
      bottom: '1px solid #f4f4f4',
      // 编辑信息对话框标题
      title: '',
      // 性别选项面板
      showGender: false,
      // 性别选项列表
      actions: [
        { name: '男', val: '0' },
        { name: '女', val: '1' }
      ]
    }
  },
  components: {
    navBar,
    editBanner,
    editDialog
  },
  computed: {
    userImg () {
      if (!this.model.user_img) {
        return '@/assets/default_img.jpg'
      }
      return this.model.user_img
    },
    userDesc () {
      if (!this.model.user_desc) {
        return '这个人很懒，什么都没有留下'
      }
      return this.model.user_desc
    }
  },
  methods: {
    // 文件上传组件回调函数
    async afterRead (file) {
      // 只有选择图片文件才可以上传
      if (!/^image\//.test(file.file.type)) {
        this.$msg.fail('请选择图片文件上传')
        return
      }
      // 使用FormData把数据发给后台
      const formData = new FormData()
      formData.append('file', file.file)
      const { data: res } = await this.$http.post('/upload', formData)
      this.model.user_img = res.url
      // 请求后台更新用户信息
      const { success } = await this.updateUserInfo()
      if (success) {
        this.$msg.success('头像上传成功')
        return
      }
      this.$msg.fail('头像上传失败')
    },
    // 打开编辑信息对话框
    openEditDialog (target) {
      this.title = target
      this.$refs.editDialogRef.openDialog()
    },
    // 点击编辑信息对话框确定按钮
    async saveContent (content) {
      if (!content) {
        // 如果什么都没有填写
        return
      }
      if (this.title === '昵称') {
        this.model.name = content
      } else {
        this.model.user_desc = content
      }
      // 向后台更新用户信息
      const res = await this.updateUserInfo()
      if (res.success) {
        this.$msg.success(`${this.title}更新成功！`)
      } else {
        this.$msg.fail(`${this.title}更新失败！`)
      }
      // 关闭编辑信息对话框
      this.$refs.editDialogRef.closeDialog()
    },
    // 选择性别
    selectGender (select) {
      this.model.gender = select.val
      this.updateUserInfo()
    },
    // 更新用户信息
    async updateUserInfo () {
      const { data: res } = await this.$http.post(
        `/update/${localStorage.getItem('id')}`,
        this.model
      )
      return res
    },
    // 退出登录
    loginOut () {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  img {
    width: 12.778vw;
    height: 12.778vw;
    border-radius: 50%;
  }
  .btns {
    margin: 8.333vw 0;
    div {
      text-align: center;
      background-color: #fff;
      line-height: 12.5vw;
      font-size: 3.889vw;
      color: #ff9db5;
    }
    .back {
      border-bottom: 1px solid #f4f4f4;
    }
  }
}
</style>
