<template>
  <div class="home">
    <nav-bar></nav-bar>
    <div class="editCategory" :class="{'editCategory-fixed ':isFixed}" @click="setCategory">
      <van-icon name="setting-o" />
    </div>
    <van-tabs
      v-model="active"
      sticky
      swipeable
      color="#ff9db5"
      animated
      line-width="11.111vw"
      @rendered="getContentList(active,category[active]._id)"
      @scroll="scrollFix"
    >
      <van-tab v-for=" item in category " :title="item.title" :key="item._id">
        <van-list
          v-show="active===item.currentActive"
          v-model="item.loading"
          :finished="item.finished"
          :immediate-check="false"
          finished-text="我是有底线的~~"
          @load="onLoad"
          :offset="10"
        >
          <div class="videoPanel">
            <video-list :video-list="video" v-for="(video,index) in item.list" :key="index"></video-list>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import navBar from '@/components/common/navBar.vue'
import VideoList from '@/views/VideoList.vue'
export default {
  name: 'Home',
  created () {
    this.getCategory()
  },
  data () {
    return {
      active: 0,
      // 标签目录
      category: [],
      // 固定定位
      isFixed: false
    }
  },
  components: {
    navBar,
    VideoList
  },
  methods: {
    // 获取导航标签目录
    async getCategory () {
      if (localStorage.getItem('newCate')) {
        // 当本地存储有栏目时
        const res = JSON.parse(localStorage.getItem('newCate'))
        this.changeCategory(res)
        return
      }
      const { data: res } = await this.$http.get('/category')
      this.changeCategory(res)
    },
    // 改造category 增加一个list属性
    changeCategory (data) {
      const newCategory = data.map((item, index) => {
        /*
           给每个目录对象新增加一个list数组属性
           page页码
           pagesize内容数量
           loading finished加载状态属性
         */
        item.list = []
        item.page = 0
        item.pagesize = 10
        item.loading = false
        item.finished = false
        // 用来判断this.active是否为当前对应的tab
        item.currentActive = index

        return item
      })
      this.category = newCategory
    },
    // 获取视频内容列表
    async getContentList (active, id) {
      const { data: res } = await this.$http.get('/detail/' + id, {
        params: {
          page: this.category[active].page,
          pagesize: this.category[active].pagesize
        }
      })
      this.category[active].list.push(...res)

      // 如果数据已经全部加载完毕
      if (res.length < this.category[active].pagesize) {
        this.category[active].finished = true
      }
      this.category[active].loading = false
    },
    // 滚动加载更多内容
    onLoad () {
      // 保留当前激活的tab 避免加载中切换tab改变active的值
      const active = this.active
      // 当前目录对象
      const currentItem = this.category[active]
      // 页码+1
      currentItem.page++
      // 请求数据
      setTimeout(() => {
        this.getContentList(active, currentItem._id)
      }, 1000)
    },
    // 自定义目录设置按钮滚动固定
    scrollFix (e) {
      this.isFixed = e.isFixed
    },
    setCategory () {
      this.$router.push('/editCategory')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  background-color: #fff;
  .editCategory {
    position: absolute;
    right: 0.556vw;
    top: 12.5vw;
    width: 13.889vw;
    height: 12.222vw;
    color: #ff9db5;
    font-size: 6.667vw;
    line-height: 13.889vw;
    text-align: center;
    z-index: 999;
    background-color: #fff;
  }
  .editCategory-fixed {
    position: fixed;
    right: 0.556vw;
    top: 0;
  }
}
.videoPanel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 1.389vw;
}
</style>
