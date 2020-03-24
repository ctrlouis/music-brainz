<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <tr>
        <td>{{data.title}}</td>
        <td><router-link :to="albumUrl">{{ album }}</router-link></td>
        <td><span v-for="artist in artists"><router-link :to="`/artists/${artist.id}`">{{ artist.name }}</router-link></span></td>
        <td>{{time}}</td>
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
        time() {
            /*
            * convert time in ms into time min
            *
            * @output => (string) formated time in min
            */
            let time = "";
            if (this.data.length) {
                const millis = this.data.length
                const minutes = Math.floor(millis / 60000);
                const seconds = ((millis % 60000) / 1000).toFixed(0);
                time = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
            return time;
        },
        albumUrl() {
            /*
            * generate url to details of the current album
            *
            * @output => (string) url to album details
            */
            return `/albums/${this.data.releases[0].id}`;
        }
    }
}
</script>

<style lang="scss">

</style>
