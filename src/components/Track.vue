/*
* COMPONENT
* Display short track informations
*/

<template>
    <tr>
        <td v-if="info.title">{{data.title}}</td>
        <td v-if="info.album"><router-link :to="albumUrl">{{ album }}</router-link></td>
        <td v-if="info.artists"><span v-for="artist in artists"><router-link :to="`/artists/${artist.id}`">{{ artist.name }}</router-link></span></td>
        <td v-if="info.time">{{time}}</td>
    </tr>
</template>

<script>
export default {
    props: ['data', 'info'],

    data() {
        return {}
    },

    computed: {
        album() {
            /*
            * @return (string) album title if available in current information
            */
            let album = null;
            if (this.data.releases && this.data.releases[0]) {
                album = this.data.releases[0].title;
            }
            return album;
        },
        artists() {
            /*
            * @return (array) artists array if available in current information
            */
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
            * @return => (string) formated time in min
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
            * @return => (string) url to album details
            */
            let url = "";
            if (this.data.releases && this.data.releases[0]) {
                url = `/albums/${this.data.releases[0].id}`
            }
            return url;
        }
    }
}
</script>

<style lang="scss">

</style>
