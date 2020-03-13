<template>
    <div>
        <div v-if="artist">
            <h1>{{artist.name}}</h1>
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
            artist: null,
            albums: null,
            api: {
                music: {
                    url: "https://musicbrainz.org/ws/2"
                }
            }
        }
    },

    methods: {
        fetchArtistData() {
            const url = `${this.api.music.url}/artist/${this.$route.params.id}?fmt=json`;
            
            axios.get(url)
            .then((res) => {
                this.artist = res.data;
                console.log(this.artist);
            }).catch(err => console.error(err));
        },
        fetchArtistAlbums() {
            const url = `${this.api.music.url}/release-group?artist=${this.$route.params.id}&fmt=json&limit=10`;
            console.log(url);
            axios.get(url)
            .then((res) => {
                this.albums = res.data;
                console.log(this.albums);                
            }).catch(err => console.error(err));
        },
        fetchArtistTracks() {
            const url = `${this.api.music.url}/release?artist=${this.$route.params.id}&fmt=json&limit=10`;
            console.log(url);
            axios.get(url)
            .then((res) => {
                this.tracks = res.data;
                console.log(this.tracks);                
            }).catch(err => console.error(err));
        }
    },

    created() {
        this.id = this.$route.params.id;
        this.fetchArtistData();
        this.fetchArtistAlbums();
        this.fetchArtistTracks();
    }
}
</script>

<style lang="scss">

</style>
