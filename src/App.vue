<template>
  <div id="app">
    <div>123</div>
    <div>234</div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created(){
    // let data = {
    //   bookmardIds: 'all',
    //   unClassified: true,
    //   onlineFirst: true,
    //   liveFirst: false,
    //   living: true,
    //   online: true,
    //   offline: true,
    // }
    // this.$http.get("/ccp/tvucc-user/userDevice/listR", { params: data })
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
