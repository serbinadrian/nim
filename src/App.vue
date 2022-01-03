<template>
    <Home/>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*{
  margin: 0;
  padding: 0;
}

html, body{
  width: 100%;
  height: 100%;
}

html{
  overflow: hidden;
}

body{
  overflow: auto;
}

.container {
  padding: 20px;
  margin: 10px auto;
  width: 240px;
  height: 200px;
  text-align: center;
  overflow: hidden;
  border: 1px solid black;
}

.title{
  font-size: 28px;
  color: purple;
}
</style>
