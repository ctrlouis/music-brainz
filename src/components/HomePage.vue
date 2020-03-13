<template>
    <div>
        <p>Search any artists, albums or track you want to get a amazing information about them !</p>
        <SearchForm  @newSearch="onNewSearch"></SearchForm>
    </div>
</template>

<script>
import SearchForm from './SearchForm.vue';


export default {
    components: { SearchForm },

    data() {
        return {}
    },

    methods: {
        onNewSearch(research) {
            const url = "/search/" + research;
            this.$router.replace(url);
        }
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    // color: #2c3e50;
    margin-top: 60px;
}

h1, h2 {
    font-weight: normal;
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
