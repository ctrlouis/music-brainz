<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <tr>
        <td>{{title}}</td>
        <td v-if="album"><router-link :to="albumUrl">{{ title }}</router-link></td>
        <td><span v-for="artist in artists"><router-link :to="`/artists/${artist.id}`">{{ artist.name }}</router-link></span></td>
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
                this.data['artist-credit'].forEach(artist => artists.push(artist.artist));
            }
            return artists;
        },
        albumUrl() {
            return `/albums/${this.data['release-group'].id}`;
        }
    }
}
</script>

<style lang="scss">

</style>
