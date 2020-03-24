<template>
    <div>
        <div v-if="loaded">
            <div class="artist">
                <h2>{{fetchData.artist.data.name}}</h2>
                <div v-if="fetchData.artist.data.type">
                    <p>Type: {{fetchData.artist.data.type}}</p>
                </div>
                <div v-if="fetchData.artist.data.gender">
                    <p>Gender: {{fetchData.artist.data.gender}}</p>
                </div>
                <div v-if="fetchData.artist.data.country">
                    <p>Country: {{fetchData.artist.data.country}}</p>
                </div>
            </div>                
            <div>
                <h2><i class="fas fa-compact-disc"></i> Albums :</h2>
                <div class="cards">
                    <Album v-for="album in fetchData.albums.data.releases" :data="album"></Album>
                </div>
            </div>
        </div>
        <div v-else><Loader></Loader></div>
    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';
import Track from './Track.vue';
import Loader from './Loader.vue';


export default {
    components: { Album, Track, Loader },

    data() {
        return {
            id: null,
            fetchData: {
                artist: null,
                albums: null
            },
            api: {
                music: {
                    url: "https://musicbrainz.org/ws/2"
                }
            }
        }
    },

    methods: {
        searchAll(research) {
            const requests = [this.getArtistsRequest(), this.getAlbumsRequest()];
            axios.all(requests)
            .then(axios.spread((artist, albums) => {
                this.fetchData.artist = artist;
                this.fetchData.albums = albums;
                console.log(this.fetchData.albums);
                // this.fetchData.tracks = tracks;
            })).catch(err => console.error(err));
        },

        getArtistsRequest() {
            const url = this.api.music.url + "/artist/" + this.id  + "?fmt=json";
            return axios.get(url);
        },

        getAlbumsRequest() {
            const url = this.api.music.url + "/release?artist=" + this.id + "&fmt=json";
            return axios.get(url);
        }
    },

    computed: {
        loaded() {
            return this.fetchData.albums || this.fetchData.artists || this.fetchData.tracks;
        }
    },

    created() {
        this.id = this.$route.params.id;
        this.searchAll();
    }
}
</script>

<style lang="scss">
.info {
    justify-content: start;
}
</style>
