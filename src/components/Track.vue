<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <div>
        <h3>{{title}}</h3>
        <p v-if="album">{{album}}</p>
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
            let album = null;
            if (this.data['release-group']) {
                album = this.data['release-group'].title;
            }
            return album;
        },
        artists() {
            let artists = [];
            if (this.data['artist-credit']) {
                this.data['artist-credit'].forEach(artist => artists.push(artist));
            }
            return artists;
        }
    }
}
</script>

<style lang="scss">

</style>
