<template>
    <div>
        <h2>All {{ type }} related to "{{ research }}" </h2>
        <div class="cards">
            <Album  v-if="type == 'albums' && dataAreFetch"     v-for="album in fetchedData.data"   :data="album"></Album>
            <Artist v-if="type == 'artists' && dataAreFetch"    v-for="artist in fetchedData.data"  :data="artist"></Artist>
        </div>
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
                    <Track v-for="track in fetchedData.data" :data="track"></Track>
                </tbody>
            </table>
        </div>
        <div v-if="loading"><Loader></Loader></div>
        <button v-if="dataLeft" class="button" @click="loadMore">Load more</button>
    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';
import Artist from './Artist.vue';
import Track from './Track.vue';
import Loader from './Loader.vue';


export default {
    components: { Album, Artist, Track, Loader },

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
            loading : true
        }
    },

    methods: {
        fetchData() {
            switch (this.type) {
                case 'albums':
                    this.fetchedData.url = this.api.music.url + "/release?query=title:" + this.research + "&fmt=json";
                    this.fetchAlbums();
                    break;
                case 'artists':
                    this.fetchedData.url = this.api.music.url + "/artist?query=name:" + this.research + "&fmt=json";
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
            const url = this.fetchedData.url + this.calculPage(this.pageNbr);
            console.log(url);
            axios.get(url)
            .then(res => {
                this.fetchedData.count = res.data.count;
                res.data.releases.forEach(album => this.fetchedData.data.push(album));
            })
            .catch(err => console.error(err))
            .finally(() => this.loading = false);
        },

        fetchArtists() {
            const url = this.fetchedData.url + this.calculPage(this.pageNbr);
            axios.get(url)
            .then(res => {
                this.fetchedData.count = res.data.count;
                res.data.artists.forEach(artist => this.fetchedData.data.push(artist))
                console.log(this.fetchedData.data);
            })
            .catch(err => console.error(err))
            .finally(() => this.loading = false);
        },

        fetchTracks() {
            const url = this.fetchedData.url + this.calculPage(this.pageNbr);
            axios.get(url)
            .then(res => {
                this.fetchedData.count = res.data.count;
                res.data.recordings.forEach(track => this.fetchedData.data.push(track))
            })
            .catch(err => console.error(err))
            .finally(() => this.loading = false);
        },

        loadMore() {
            this.loading = true;
            this.fetchData();
        },

        calculPage(pageNbr=0, pageSize=25) {
            const offset = pageNbr * pageSize;
            return "&limite=" + pageSize + "&offset=" + offset;
        }
    },

    computed: {
        dataAreFetch() {
            return this.fetchedData.data.length > 0;
        },
        dataLeft() {
            return this.fetchedData.data.length < this.fetchedData.count;
        }
    },

    created() {
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
