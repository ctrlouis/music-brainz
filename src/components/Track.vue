<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <div>
        <h3>{{title}}</h3>
        <p>{{album}}</p>
        <p v-for="artist in artists">{{artist.name}}</p>
    </div>
</template>

<script>
export default {
    props: ['data'],

    data() {
        return {}
    },

    computed: {
        title() {
            return this.data.title;
        },
        album() {
            return this.data['release-group'].title;
        },
        artists() {
            let artists = [];
            this.data['artist-credit'].forEach(artist => artists.push(artist));
            return artists;
        }
    }
}
</script>

<style lang="scss">

</style>
