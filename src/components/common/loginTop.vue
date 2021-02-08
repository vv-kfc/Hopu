<template>
    <div class="loginTop">
        <div></div>
        <div>{{title}}</div>
        <div>
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
.loginTop {
    height: 12.5vw;
    background-color: #fff;
    display: flex;
    div {
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4.444vw;
    }
}
</style>
