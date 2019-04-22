<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created(){
    let data = {
      bookmardIds: 'all',
      unClassified: true,
      onlineFirst: true,
      liveFirst: false,
      living: true,
      online: true,
      offline: true,
    }
    this.$http.get("/ccp/tvucc-user/userDevice/listR", { params: data })
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
  color: #fff;
  padding-top: 60px;
  background: #252525;

}
</style>
