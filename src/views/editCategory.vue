<template>
  <div class="editCategory">
    <nav-bar></nav-bar>
    <div class="editTitle">自定义编辑栏目</div>
    <div class="margin">
      <van-divider dashed :style="selected">已选栏目</van-divider>
      <div class="selected">
        <div v-for="(item,index) in newCate" :key="index" @click="removeClick(index)">{{item.title}}</div>
      </div>
    </div>
    <div class="margin">
      <van-divider dashed :style="del">未选栏目</van-divider>
      <div class="selected del" :class="{border0:border0}">
        <div v-for="(item,index) in delCate" :key="index" @click="addClick(index)">{{item.title}}</div>
      </div>
    </div>
    <div class="back" @click="toHome">返回主页</div>
  </div>
</template>

<script>
import navBar from '@/components/common/navBar.vue'

export default {
  created () {
    this.getCategory()
  },
  data () {
    return {
      selected: {
        color: 'skyblue',
        borderColor: 'skyblue',
        padding: '0 4.444vw',
        fontSize: '5vw'
      },
      del: {
        color: 'red',
        borderColor: 'red',
        padding: '0 4.444vw',
        fontSize: '5vw'
      },
      // 已选栏目
      newCate: [],
      // 未选栏目
      delCate: [],
      //   是否做了改变
      change: false,
      border0: true
    }
  },
  components: {
    navBar
  },
  methods: {
    // 获取导航标签目录
    async getCategory () {
      if (localStorage.getItem('newCate') && localStorage.getItem('delCate')) {
        // 当本地存储有栏目时
        this.newCate = JSON.parse(localStorage.getItem('newCate'))
        this.delCate = JSON.parse(localStorage.getItem('delCate'))
        return
      }

      const { data: res } = await this.$http.get('/category')
      this.newCate = res
    },
    // 移除所选栏目
    removeClick (index) {
      if (this.newCate.length === 1) {
        this.$msg.fail('至少保留一个栏目！')
        return
      }
      this.change = true
      this.delCate.push(this.newCate.splice(index, 1)[0])
    },
    // 添加栏目
    addClick (index) {
      this.change = true
      this.newCate.push(this.delCate.splice(index, 1)[0])
    },
    toHome () {
      if (this.change) {
        //   如果有改变过栏目
        this.$router.push('/home')
        location.reload()
        return
      }
      this.$router.back()
    }
  },
  watch: {
    newCate () {
      localStorage.setItem('newCate', JSON.stringify(this.newCate))
    },
    delCate () {
      if (this.delCate.length === 0) {
        localStorage.removeItem('delCate')
        this.border0 = true
        console.log(1)
        return
      }
      this.border0 = false
      localStorage.setItem('delCate', JSON.stringify(this.delCate))
    }
  }
}
</script>

<style lang="less" scoped>
.editCategory {
  background-color: #fff;
  height: 166.667vw;
  .editTitle {
    line-height: 13.889vw;
    text-align: center;
    font-size: 6.111vw;
    font-weight: 600;
    color: #ff9db5;
  }
  .margin {
    margin: 4.167vw 0 8.333vw;
  }
  .selected {
    display: flex;
    border: 0.278vw solid skyblue;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    padding: 0 2.778vw;
    div {
      width: 25%;
      border: 0.278vw solid skyblue;
      margin: 2.778vw 2.778vw;
      text-align: center;
      line-height: 8.333vw;
      color: skyblue;
      font-size: 3.889vw;
    }
  }
  .del {
    border-color: red;
    div {
      border-color: red;
      color: red;
    }
  }
  .back {
    width: 50%;
    line-height: 8.333vw;
    text-align: center;
    margin: 0 auto;
    padding: 1.389vw;
    background-color: #ff9db5;
    color: #fff;
    font-size: 4.444vw;
  }
  .border0 {
    border: 0;
  }
}
</style>
