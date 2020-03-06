<!-- ALBUMS LIST DISPLAYER COMPONENTS -->

<template>
    <div>
        <Album v-if="" v-for="album in albums['release-groups']" :data="album"></Album>
        <Artist v-if="" v-for="artist in artists['artist']" :data="artist"></Artist>
        <Track v-if="" v-for="track in tracks['release']" :data="track"></Track>
    </div>
</template>

<script>
import Album from './Album.vue';
import Artist from './Artist.vue';
import Track from './Track.vue';


export default {
    props: ['albums, artists, tracks'],

    components: { Album, Artist, Track }
}
</script>

<style lang="scss">

</style>
