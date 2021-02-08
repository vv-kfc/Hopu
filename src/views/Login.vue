<template>
  <div class="register">
    <login-top title="登录bilibili">
      <template v-slot:right>
        <div @click="$router.push('/register')" style="font-size:3.333vw;color:#ff9db5">切换注册</div>
      </template>
    </login-top>

    <login-text
      label="账号"
      placeholder="请输入账号"
      :rule="/^.{6,12}$/"
      @iptValue="text=>model.username=text"
      style="margin:4.167vw 0"
    ></login-text>
    <login-text
      type="password"
      label="密码"
      placeholder="请输入密码"
      @iptValue="text=>model.password=text"
      :rule="/^.{6,16}$/"
    ></login-text>
    <login-btn btnText="登录" @submit="onLogin"></login-btn>
  </div>
</template>

<script>
import loginTop from '@/components/common/loginTop.vue'
import loginText from '@/components/common/loginText.vue'
import loginBtn from '@/components/common/loginBtn.vue'

export default {
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    loginTop,
    loginText,
    loginBtn
  },
  methods: {
    // 登录处理
    async onLogin () {
      const flag = this.model.username && this.model.password
      if (flag) {
        // 校验规则通过 发起登录请求
        const { data: res } = await this.$http.post('/login', this.model)
        this.$msg(res.msg)
        if (res.code === 200) {
          // 把id和token保存到本地
          localStorage.setItem('id', res.id)
          localStorage.setItem('token', res.token)
          // 登录成功 等待1秒后 跳转到个人中心
          setTimeout(() => {
            this.$router.push('/userinfo')
          }, 1000)
        }
      } else {
        this.$msg.fail('填写有误，请修改输入!')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>>
