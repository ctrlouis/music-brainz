<template>
  <div>
    <h1>404 Not Found</h1>
    <router-link to="/"><h2>Return to the app</h2></router-link>
  </div>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {}
  },

  created() {
    setTimeout(() => this.$router.replace("/"), 5000);
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
  text-align: center;
}

h2 {
  color: #42b983;
  margin: 2em 0 4em 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
