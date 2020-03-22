<template>
    <div>
        <div v-if="type == 'albums' && fetchedData.data">
            <Album v-for="album in fetchedData.data" :data="album"></Album>
            <button v-if="fetchedData.data.length < fetchedData.count" @click="fetchData">Load more</button>
        </div>
        <div v-else-if="type == 'artists' && fetchedData.data">
            <Artist v-for="artist in fetchedData.data" :data="artist"></Artist>
            <button v-if="fetchedData.data.length < fetchedData.count" @click="fetchData">Load more</button>
        </div>
        <div v-else-if="type == 'tracks' && fetchedData.data">
            <Track v-for="track in fetchedData.data" :data="track"></Track>
            <button v-if="fetchedData.data.length < fetchedData.count" @click="fetchData">Load more</button>
        </div>
        <p v-else>Loading</p>
    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';
import Artist from './Artist.vue';
import Track from './Track.vue';


export default {
    components: { Album, Artist, Track },

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
            }
        }
    },

    methods: {
        fetchData() {
            switch (this.type) {
                case 'albums':
                    this.fetchedData.url = this.api.music.url + "/release-group?query=" + this.research + "&fmt=json";
                    this.fetchAlbums();
                    break;
                case 'artists':
                    this.fetchedData.url = this.api.music.url + "/artist?query=" + this.research + "&fmt=json";
                    this.fetchArtists();
                    break;
                case 'tracks':
                    this.fetchedData.url = this.api.music.url + "/release?query=" + this.research + "&fmt=json";
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
                res.data['release-groups'].forEach(album => this.fetchedData.data.push(album))
            })
            .catch(err => console.error(err));
        },

        fetchArtists() {
            const url = this.fetchedData.url + this.calculPage(this.pageNbr);
            axios.get(url)
            .then(res => {
                this.fetchedData.count = res.data.count;
                res.data['artists'].forEach(artist => this.fetchedData.data.push(artist))
            })
            .catch(err => console.error(err));
        },

        fetchTracks() {
            const url = this.fetchedData.url + this.calculPage(this.pageNbr);
            axios.get(url)
            .then(res => {
                this.fetchedData.count = res.data.count;
                res.data['releases'].forEach(track => this.fetchedData.data.push(track))
            })
            .catch(err => console.error(err));
        },

        calculPage(pageNbr=0, pageSize=25) {
            const offset = pageNbr * pageSize;
            return "&limite=" + pageSize + "&offset=" + offset;
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
</style>
