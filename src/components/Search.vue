<template>
    <div>
        <SearchForm @newSearch="onNewSearch"></SearchForm>
        <h3 class="indication">Result related to "{{research}}"</h3>
        
        <div v-if="loaded && !error.set">
            <div class="titleMore">
                <h2><i class="fas fa-user"></i> Artists :</h2>
                <router-link :to="moreArtistUrl">View all</router-link>
            </div>
            <div v-if="fetchData.artists" class="cards">
                <Artist v-for="artist in fetchData.artists.data['artists']" :data="artist"></Artist>
            </div>

            <div class="titleMore">
                <h2><i class="fas fa-compact-disc"></i> Albums :</h2>
                <router-link :to="moreAlbumUrl">View all</router-link>
            </div>
            <div v-if="fetchData.albums" class="cards">
                <Album v-for="album in fetchData.albums.data.releases" :data="album"></Album>
            </div>

            <div class="titleMore">
                <h2><i class="fas fa-music"></i> Tracks :</h2>
                <router-link :to="moreTrackUrl">View all</router-link>
            </div>
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
                        <Track v-for="track in this.fetchData.tracks.data.recordings" :data="track" :info="{title: true, album: true, artist: true, time: true}"></Track>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="!error.set"><Loader></Loader></div>
        <Error v-else>{{error.message}}</Error>
    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';
import Artist from './Artist.vue';
import Track from './Track.vue';
import SearchForm from './SearchForm.vue';
import Loader from './Loader.vue';
import Error from './Error.vue';


export default {
    components: { SearchForm, Album, Artist, Track, Loader, Error },

    data() {
        return {
            api: {
                music: {
                    url: "http://musicbrainz.org/ws/2"
                }
            },
            research: "",
            fetchData: {
                albums: null,
                artists: null,
                tracks: null
            },
            error: {
                set: false,
                message: ""
            }
        }
    },

    methods: {
        onNewSearch(research) {
            const url = "/search/" + research;
            this.$router.replace(url);
            this.research = research;
            this.searchAll();
        },

        searchAll(research) {
            this.fetchData = {
                albums: null,
                artists: null,
                tracks: null
            }
            const requests = [this.getAlbumsRequest(), this.getArtistsRequest(), this.getTracksRequest()];
            axios.all(requests)
            .then(axios.spread((albums, artists, tracks) => {
                this.fetchData.artists = artists;
                this.fetchData.albums = albums;
                this.fetchData.tracks = tracks;
            })).catch(err => this.setError());
        },

        getAlbumsRequest() {
            const url = this.api.music.url + "/release?query=" + this.research + "&fmt=json";
            return axios.get(url);
        },

        getArtistsRequest() {
            const url = this.api.music.url + "/artist?query=" + this.research  + "&fmt=json";
            return axios.get(url);
        },

        getTracksRequest() {
            const url = this.api.music.url + "/recording?query=title:" + this.research + "fmt=json";
            return axios.get(url);
        },

        setError() {
            this.error.set = true;
            this.error.message = "An error occurred when fetching data. Please retry later.";
        }
    },

    computed: {
        moreAlbumUrl() {
            return `/search/albums/${this.research}`;
        },
        moreArtistUrl() {
            return `/search/artists/${this.research}`;
        },
        moreTrackUrl() {
            return `/search/tracks/${this.research}`;
        },
        loaded() {
            return this.fetchData.albums || this.fetchData.artists || this.fetchData.tracks;
        }
    },

    created() {
        this.research = this.$route.params.research;
        this.searchAll();
    }
}
</script>

<style lang="scss" scoped>
.indication {
    text-align: center;
    margin-top: 2%;
}
</style>
