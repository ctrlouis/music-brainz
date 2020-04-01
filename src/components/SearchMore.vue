/*
* PAGE
* Search for all albums,
* or all artists,
* or all tracks
*/

<template>
    <div>
        <SearchForm @newSearch="onNewSearch"></SearchForm>
        <h2>All {{ type }} related to "{{ research }}" </h2>
        <div>
            <div class="cards">

                <!-- albums -->
                <Album  v-if="type == 'albums' && dataAreFetch"     v-for="album in fetchedData.data"   :data="album"></Album>

                <!-- artists -->
                <Artist v-if="type == 'artists' && dataAreFetch"    v-for="artist in fetchedData.data"  :data="artist"></Artist>

            </div>

            <!-- tracks -->
            <div v-if="type == 'tracks' && dataAreFetch">
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
                        <Track v-for="track in fetchedData.data" :data="track" :info="{title: true, album: true, artists: true, time: true}"></Track>
                    </tbody>
                </table>
            </div>

            <div v-if="loading && !error.set"><Loader></Loader></div>
            <button v-if="dataLeft" class="button" @click="loadMore">Load more</button>

        </div>
        <Error v-if="error.set">{{error.message}}</Error>

    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';
import Artist from './Artist.vue';
import SearchForm from './SearchForm.vue';
import Track from './Track.vue';
import Loader from './Loader.vue';
import Error from './Error.vue';


export default {
    components: { Album, Artist, Track, SearchForm, Loader, Error },

    data() {
        return {
            api: {
                music: {
                    url: "http://musicbrainz.org/ws/2"
                }
            },
            type: null,
            research: "",
            pageNbr: 0,
            fetchedData: {
                count: 0,
                data: [],
                url: ""
            },
            loading : true,
            error: {
                set: false,
                message: ""
            }
        }
    },

    methods: {
        fetchData() {
            /*
            * allow to fetch the right data type
            * according to previous user selection
            * (albums, artists, tracks)
            */
            switch (this.type) {
                case 'albums':
                    this.fetchedData.url = this.api.music.url + "/release?query=" + this.research + "&fmt=json";
                    this.fetchAlbums();
                    break;
                case 'artists':
                    this.fetchedData.url = this.api.music.url + "/artist?query=" + this.research + "&fmt=json";
                    this.fetchArtists();
                    break;
                case 'tracks':
                    this.fetchedData.url = this.api.music.url + "/recording?query=title:" + this.research + "&fmt=json";
                    this.fetchTracks();
                    break;
                default:
                    break;
            }
        },

        fetchAlbums() {
            /*
            * fetch 25 next albums
            * and add them to current album list
            */
            const url = this.fetchedData.url + this.calculPage(this.pageNbr);
            console.log(url);
            axios.get(url)
            .then(res => {
                this.fetchedData.count = res.data.count;
                res.data.releases.forEach(album => this.fetchedData.data.push(album));
            })
            .catch(err => this.setError())
            .finally(() => this.loading = false);
        },

        fetchArtists() {
            /*
            * fetch 25 next artists
            * and add them to current artist list
            */
            const url = this.fetchedData.url + this.calculPage(this.pageNbr);
            axios.get(url)
            .then(res => {
                this.fetchedData.count = res.data.count;
                res.data.artists.forEach(artist => this.fetchedData.data.push(artist))
            })
            .catch(err => this.setError())
            .finally(() => this.loading = false);
        },

        fetchTracks() {
            /*
            * fetch 25 next tracks
            * and add them to current track list
            */
            const url = this.fetchedData.url + this.calculPage(this.pageNbr);
            axios.get(url)
            .then(res => {
                this.fetchedData.count = res.data.count;
                res.data.recordings.forEach(track => this.fetchedData.data.push(track))
            })
            .catch(err => this.setError())
            .finally(() => this.loading = false);
        },

        loadMore() {
            /*
            * fetch more data
            */
            this.error.set = false;
            this.loading = true;
            this.fetchData();
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
        },

        onNewSearch(research) {
            /*
            * redirect user to search page
            * when searching something
            * 
            * @input => research: user research
            */
            const url = "/search/" + research;
            this.$router.replace(url);
        }
    },

    computed: {
        dataAreFetch() {
            /*
            * allow to know if some data had been fetched
            * 
            * @return true if some data had been fetched, else return false
            */
            return this.fetchedData.data.length > 0;
        },
        dataLeft() {
            /*
            * allow to know if some data aren't been fetch on api
            *
            * @return true if some data aren't been fetch on api, else return false
            */
            return this.fetchedData.data.length < this.fetchedData.count;
        }
    },

    created() {
        /*
        * on component creation,
        * start fetching data
        */
        this.type = this.$route.params.type;
        this.research = this.$route.params.research;
        this.fetchData();
    }
}
</script>

<style lang="scss" scoped>
h2, div {
    text-align: center;
}
h2 {
    margin-bottom: 1em;
}
</style>
