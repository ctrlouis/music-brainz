<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <tr>
        <td>{{title}}</td>
        <td v-if="album">{{title}}</td>
        <td v-else="album"></td>
        <td><span v-for="artist in artists">{{artist.name}}</span></td>
    </tr>
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
