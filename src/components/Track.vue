<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <tr>
        <td>{{data.title}}</td>
        <td><router-link :to="albumUrl">{{ title }}</router-link></td>
        <td><span v-for="artist in artists"><router-link :to="`/artists/${artist.id}`">{{ artist.name }}</router-link></span></td>
        <td>{{data.length}}</td>
    </tr>
</template>

<script>
export default {
    props: ['data'],

    data() {
        return {}
    },

    computed: {
        album() {
            let album = null;
            if (this.data.releases[0]) {
                album = this.data.releases[0].title;
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
            /*
            * generate url to details of the current album
            *
            * @output => (string) url to album details
            */
            return `/albums/${this.data.releases[0].id}`;
        },
        millisToMinutesAndSeconds(millis) {
            /*
            * convert time in ms into time min
            *
            * @input => millis: in ms
            * @output => (string) formated time in min
            */
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }
    }
}
</script>

<style lang="scss">

</style>
