<template>
    <div>
        <SearchForm @newSearch="onNewSearch"></SearchForm>
        <h3 class="indication">Result related to "{{research}}"</h3>
        
        <h2>Albums :</h2>
        <div v-if="fetchData.albums" >
            <Album v-for="album in fetchData.albums.data['release-groups']" :data="album"></Album>
            <router-link :to="moreAlbumUrl">Show more</router-link>
        </div>
        <p v-else>Loading</p>

        <h2>Artists :</h2>
        <Artist v-if="fetchData.artists" v-for="artist in fetchData.artists.data['artists']" :data="artist"></Artist>
        <p v-else>Loading</p>

        <h2>Tracks :</h2>
        <div v-if="fetchData.tracks">
            <Track v-for="track in fetchData.tracks.data['releases']" :data="track"></Track>
            <router-link :to="moreTrackUrl">Show more</router-link>
        </div>
        <p v-else>Loading</p>
    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';
import Artist from './Artist.vue';
import Track from './Track.vue';
import SearchForm from './SearchForm.vue';


export default {
    components: { SearchForm, Album, Artist, Track },

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
                this.fetchData.albums = albums;
                console.log(this.fetchData.albums);
                this.fetchData.artists = artists;
                console.log(this.fetchData.artists);
                this.fetchData.tracks = tracks;
                console.log(this.fetchData.tracks);
            })).catch(err => console.error(err));
        },

        getAlbumsRequest() {
            const url = this.api.music.url + "/release-group?query=" + this.research + "&" + this.calculPage();
            return axios.get(url);
        },

        getArtistsRequest() {
            const url = this.api.music.url + "/artist?query=" + this.research  + "&" + this.calculPage();
            return axios.get(url);
        },

        getTracksRequest() {
            const url = this.api.music.url + "/release?query=" + this.research + "&" + this.calculPage();
            return axios.get(url);
        },
        /*
        * Calcule page and offest query options
        */
        calculPage(pageNbr=0, pageSize=30) {
            const offset = pageNbr * pageSize;
            return "limite=" + pageSize + "&offset=" + offset;
        }
    },

    computed: {
        moreAlbumUrl() {
            return `/search/albums/${this.research}`;
        },
        moreTrackUrl() {
            return `/search/tracks/${this.research}`;
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
h2 {
    margin-top: 3%;
}
</style>
