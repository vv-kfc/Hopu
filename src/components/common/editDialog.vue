<template>
  <div>
    <van-dialog
      v-model="show"
      :title="title"
      confirm-button-color="#ff9db5"
      show-cancel-button
      @cancel="closeDialog"
      @confirm="$emit('confirm',content)"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      show: false,
      content: ''
    }
  },
  methods: {
    openDialog () {
      this.show = true
    },
    closeDialog () {
      this.show = false
      this.content = ''
    }
  }
}
</script>

<style>
</style>
