<!-- MAIN COMPONENT -->

<template>
  <div id="app">
    <h1>My Music Manager</h1>
    <router-view></router-view>
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

<style lang="scss">

</style>
