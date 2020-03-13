<template>
    <div>
        <SearchForm @newSearch="onNewSearch"></SearchForm>
        <p>Result related to "{{research}}"</p>
        <h2>Albums :</h2>
        <Album v-if="fetchData.albums" v-for="album in fetchData.albums.data['release-groups']" :data="album"></Album>
        <p v-else="fetchData.albums">Loading</p>
        <h2>Artists :</h2>
        <Artist v-if="fetchData.artists" v-for="artist in fetchData.artists.data['artists']" :data="artist"></Artist>
        <p v-else="fetchData.albums">Loading</p>
        <h2>Tracks :</h2>
        <Track v-if="fetchData.tracks" v-for="track in fetchData.tracks.data['releases']" :data="track"></Track>
        <p v-else="fetchData.albums">Loading</p>
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
            test : 1,
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
        // exec(event) {
        //     event.preventDefault();
        //     switch (this.searchType) {
        //         case "album":
        //         this.fetchAlbums(this.searched);
        //         break;
        //         case "artist":
        //         this.fetchArtists(this.searched);
        //         break;
        //         case "track":
        //         this.fetchTracks(this.searched);
        //         break;
            
        //         default:
        //         break;
        //     }
        // },

        // /*
        // * Retrieve albums from music-brainz api
        // */
        // fetchAlbums(page=0) {
        // const url = this.api.music.url + "/release-group?query=" + this.searched + "&" + this.calculPage(page);
        // axios.get(url)
        //     .then((res) => {
        //     const albumsData = res.data;
        //     this.updateData(albumsData);
        //     this.fetchData.type = 'album';
        //     console.log(albumsData);
        //     })
        //     .catch((error) => {
        //     console.error(error);
        //     });
        // },

        // /*
        // * Retrieve artists from music-brainz api
        // */
        // fetchArtists(page=0) {
        // const url = this.api.music.url + "/artist?query=" + this.searched  + "&" + this.calculPage(page);
        // axios.get(url)
        //     .then((res) => {
        //     const artistsData = res.data;
        //     this.fetchData.type = 'artist';
        //     console.log(artistsData);
        //     })
        //     .catch((error) => {
        //     console.error(error);
        //     });
        // },

        // /*
        // * Retrieve tracks from music-brainz api
        // */
        // fetchTracks(page=0) {
        // const url = this.api.music.url + "/release?query=" + this.searched + "&" + this.calculPage(page);
        // axios.get(url)
        //     .then((res) => {
        //     const tracksData = res.data;
        //     this.fetchData.type = 'track';
        //     console.log(tracksData);
        //     })
        //     .catch((error) => {
        //     console.error(error);
        //     });
        // },

        /*
        * Calcule page and offest query options
        */
        calculPage(pageNbr=0, pageSize=100) {
            const offset = pageNbr * pageSize;
            return "limite=" + pageSize + "&offset=" + offset;
        }
    },

    created() {
        this.research = this.$route.params.research;
        this.searchAll();
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
//   color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
