<!-- MAIN COMPONENT -->

<template>
  <div id="app">
    <main>
       <router-link to="/"><h1>My Music Manager</h1></router-link>
      <router-view></router-view>
    </main>
    <footer>
      <p>App powered by <a href="https://musicbrainz.org/">musicbrainz</a></p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'app',

  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
h1, p {
  text-align: center;
}

a {
  text-decoration: none;
}
</style>
