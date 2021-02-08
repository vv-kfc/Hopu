<template>
  <div>
    <van-field
      :type="type"
      v-model="text"
      :label="label"
      :placeholder="placeholder"
      :required="required"
      :rule="rule"
    />
  </div>
</template>

<script>
export default {
  props: ['type', 'label', 'placeholder', 'required', 'rule'],
  data () {
    return {
      text: ''
    }
  },
  watch: {
    text () {
      if (this.rule) {
        // 如果有校验属性
        if (this.rule.test(this.text)) {
          // 校验通过 传值
          this.inputHandle(this.text)
        } else {
          // 校验失败 传空值
          this.inputHandle('')
        }
      } else {
        this.inputHandle(this.text)
      }
    }
  },
  methods: {
    inputHandle (text) {
      this.$emit('iptValue', text)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
