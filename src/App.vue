<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/jsfiddle">Jsfiddle</router-link> | 
      <router-link to="/html2image">html2image</router-link>
    </div>
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  position: fixed;
  width: 100%;
  padding: 30px;
  background-color: #6d85b9;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#content {
  padding-top: 82px;
  height: calc(100vh - 82px);
}
</style>
