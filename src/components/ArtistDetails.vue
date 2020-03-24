/*
* PAGE
* Display all artist information
*/
<template>
    <div>
        <div v-if="mainDataLoad || !error.set">

            <!-- artists information -->
            <div v-if="fetchData.artist" class="artist">
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

            <!-- all albums of the artist -->
            <div v-if="fetchData.albums">
                <h2><i class="fas fa-compact-disc"></i> Albums :</h2>
                <div class="cards">
                    <Album v-for="album in fetchData.albums.data.releases" :data="album"></Album>
                </div>
                <Loader v-if="lastSearch == 'albums' && loading && !error.set"></Loader>
                <Error v-if="lastSearch == 'albums' && error.set">{{error.message}}</Error>
                <button v-if="albumLeft" class="button" @click="loadMoreAlbums">Load more</button>
            </div>

            <!-- all tracks of the artist -->
            <div v-if="fetchData.tracks">
                <h2><i class="fas fa-music"></i> Tracks :</h2>
                
                <table>
                    <thead>
                        <tr>
                            <th><h4>Title</h4></th>
                            <th><h4>Time</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        <Track v-for="track in fetchData.tracks.data.recordings" :data="track" :info="{title: true, time: true}"></Track>
                    </tbody>
                </table>
                <Loader v-if="lastSearch == 'tracks' && loading && !error.set"></Loader>
                <Error v-if="lastSearch == 'tracks' && error.set">{{error.message}}</Error>
                <button v-if="trackLeft" class="button" @click="loadMoreTracks">Load more</button>
            </div>

        </div>

        <Loader v-if="!mainDataLoad && !error.set"></Loader>
        <Error v-if="error.set && !mainDataLoad">{{error.message}}</Error>
    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';
import Track from './Track.vue';
import Loader from './Loader.vue';
import Error from './Error.vue';


export default {
    components: { Album, Track, Loader, Error },

    data() {
        return {
            id: null,
            pageNbr: 0,
            fetchData: {
                artist: null,
                albums: null,
                tracks: null,
                albumCount: 0
            },
            pageNbr: {
                albums: 0,
                tracks: 0
            },
            lastSearch: "",
            api: {
                music: {
                    url: "https://musicbrainz.org/ws/2"
                }
            },
            loading : false,
            error: {
                set: false,
                message: ""
            }
        }
    },

    methods: {
        searchAll() {
            /*
            * fetch all artists data (self informations, albums, tracks) from music brainz api
            */
            const requests = [this.getArtistsRequest(), this.getAlbumsRequest(), this.getTracksRequest()];
            axios.all(requests)
            .then(axios.spread((artist, albums, tracks) => {
                this.fetchData.artist = artist;
                this.fetchData.albums = albums;
                this.fetchData.albumCount = albums.data['release-count'];
                this.fetchData.tracks = tracks;
                this.fetchData.trackCount = tracks.data['recording-count'];
            })).catch(err => this.setError());
        },

        getArtistsRequest() {
            /*
            * @return request for fetching informations about the current artist
            */
            const url = this.api.music.url + "/artist/" + this.id  + "?fmt=json";
            return axios.get(url);
        },

        getAlbumsRequest() {
            /*
            * @return request for fetching next 25 albums of the current artist
            */
            const url = this.api.music.url + "/release?artist=" + this.id + "&fmt=json" + this.calculPage(this.pageNbr.albums);
            return axios.get(url);
        },

        getTracksRequest() {
            /*
            * @return request for fetching next 25 tracks of the current artist
            */
            const url = this.api.music.url + "/recording?artist=" + this.id + "&fmt=json" + this.calculPage(this.pageNbr.tracks);
            return axios.get(url);
        },

        loadMoreAlbums() {
            /*
            * fetch more album
            */
            this.error.set = false;
            this.loading = true;
            this.lastSearch = "albums";
            this.pageNbr.albums++;
            this.getAlbumsRequest()
            .then(res => res.data.releases.forEach(album => this.fetchData.albums.data.releases.push(album)))
            .catch(err => this.setError())
            .finally(() => this.loading = false);
        },

        loadMoreTracks() {
            /*
            * fetch more tracks
            */
            this.error.set = false;
            this.loading = true;
            this.lastSearch = "tracks";
            this.pageNbr.tracks++;
            this.getTracksRequest()
            .then(res => res.data.recordings.forEach(track => this.fetchData.tracks.data.recordings.push(track)))
            .catch(err => this.setError())
            .finally(() => this.loading = false);
        },

        calculPage(pageNbr=0, pageSize=25) {
            /*
            * calcul offset to fetch only new data
            */
            const offset = pageNbr * pageSize;
            return "&limite=" + pageSize + "&offset=" + offset;
        },

        setError() {
            /*
            * display error
            */
            this.error.set = true;
            this.error.message = "An error occurred when fetching data. Please retry later.";
        }
    },

    computed: {
        mainDataLoad() {
            /*
            * allow to know if artist informations, first 25 albums and tracks had been fetch
            * 
            * @return true if data had been fetched, else return false
            */
            return this.fetchData.artist && this.fetchData.albums && this.fetchData.tracks;
        },

        albumLeft() {
            /*
            * allow to know if some albums data aren't been fetch on api
            *
            * @return true if some data aren't been fetch on api, else return false
            */
            return this.fetchData.albums.data.releases.length < this.fetchData.albumCount;
        },

        trackLeft() {
            /*
            * allow to know if some tracks data aren't been fetch on api
            *
            * @return true if some data aren't been fetch on api, else return false
            */
            return this.fetchData.tracks.data.recordings.length < this.fetchData.trackCount;
        }
    },

    created() {
        /*
        * on component creation,
        * start fetching data
        */
        this.id = this.$route.params.id;
        this.searchAll();
    }
}
</script>

<style lang="scss">
.artist p {
    text-align: left;
}

div {
    text-align: center;
}
</style>
