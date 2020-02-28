<!-- ALBUMS LIST DISPLAYER COMPONENTS -->

<template>
    <div>
        <album v-for="album in albums['release-groups']" :data="album"></album>
    </div>
</template>

<script>
import Album from './Album.vue';


export default {
    props: ['albums'],

    components: { Album }
}
</script>

<style lang="scss">

</style>
