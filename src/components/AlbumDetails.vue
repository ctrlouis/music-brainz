<template>
    <div>
        <div v-if="loaded">
            <h1>{{fetchData.album.data.title}}</h1>
            <p>By <span v-for="artist in artists"><router-link :to="`/artists/${artist.id}`">{{ artist.name }}</router-link></span></p>
            <h2><i class="fas fa-music"></i> Tracks</h2>
            <div v-if="fetchData.tracks">
                <table>
                    <thead>
                        <tr>
                            <th><h4>Title</h4></th>
                            <th><h4>Album</h4></th>
                            <th><h4>Artist</h4></th>
                            <th><h4>Time</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Track v-for="track in fetchData.tracks.data.recordings" :data="track"></Track>
                    </tbody>
                </table>
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
                album: null,
                tracks: null
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
            const requests = [this.getAlbumRequest(), this.getTracksRequest()];
            axios.all(requests)
            .then(axios.spread((album, tracks) => {
                this.fetchData.album = album;
                console.log(this.fetchData.album);
                this.fetchData.tracks = tracks;
                console.log(this.fetchData.tracks);
            })).catch(err => console.error(err));
        },

        getAlbumRequest() {
            const url = this.api.music.url + "/release/" + this.id + "?fmt=json";
            return axios.get(url);
        },

        getTracksRequest() {
            const url = this.api.music.url + "/recording/?release=" + this.id + "&fmt=json";
            return axios.get(url);
        },
    },

    computed: {
        artists() {
            let artists = [];
            if (this.fetchData.album.data['artist-credit']) {
                this.fetchData.album.data['artist-credit'].forEach(artist => artists.push(artist.artist));
            }
            return artists;
        },
        loaded() {
            return this.fetchData.album || this.fetchData.tracks;
        }
    },

    created() {
        this.id = this.$route.params.id;
        this.searchAll();
    }
}
</script>

<style lang="scss">

</style>
