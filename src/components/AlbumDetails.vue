<template>
    <div>
        <div v-if="album">
            <h1>{{album.title}}</h1>
            <h2>Tracks</h2>
            <Track v-for="track in album.releases" :data="track"></Track>
        </div>
        <p v-else>Loading</p>

        <!-- <Album v-if="albums" v-for="album in albums" :data="album"></Album>
        <p v-else>Loading</p> -->
    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';
import Track from './Track.vue';


export default {
    components: { Album, Track },

    data() {
        return {
            id: null,
            album: null,
            api: {
                music: {
                    url: "https://musicbrainz.org/ws/2"
                }
            }
        }
    },

    methods: {
        fetchAlbumTracks() {
            const url = `${this.api.music.url}/release-group/${this.id}?inc=releases`;
            axios.get(url)
            .then((res) => {
                this.album = res.data;
                console.log(this.album);
            }).catch(err => console.error(err));
        }
    },

    created() {
        this.id = this.$route.params.id;
        this.fetchAlbumTracks();
    }
}
</script>

<style lang="scss">

</style>
