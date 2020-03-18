<template>
    <div>
        <div v-if="fetchData.tracks">
            <Track v-for="track in fetchData.tracks" :data="track"></Track>
            <button v-if="fetchData.tracks.length < fetchData.count" @click="onLoadMore">Load more</button>
        </div>
        <p v-else>Loading</p>
    </div>
</template>

<script>
import axios from 'axios';
import Track from './Track.vue';


export default {
    components: { Track },

    data() {
        return {
            api: {
                music: {
                    url: "http://musicbrainz.org/ws/2"
                }
            },
            research: "",
            pageNbr: 0,
            fetchData: {
                count: 0,
                tracks: null
            }
        }
    },

    methods: {
        getTracksRequest() {
            const url = this.api.music.url + "/release?query=" + this.research + "&" + this.calculPage() + "&fmt=json";
            axios.get(url)
            .then(res => {
                this.fetchData.count = res.data.count;
                this.fetchData.tracks = res.data['releases'];
            })
            .catch(err => console.error(err));
        },

        calculPage(pageNbr=0, pageSize=25) {
            const offset = pageNbr * pageSize;
            return "limite=" + pageSize + "&offset=" + offset;
        },

        onLoadMore() {
            this.pageNbr++;
            const url = this.api.music.url + "/release?query=" + this.research + "&" + this.calculPage(this.pageNbr) + "&fmt=json";
            axios.get(url)
            .then(res => res.data['releases'].forEach(track => this.fetchData.tracks.push(track)))
            .catch(err => console.error(err));
        },

        addTrack(res) {

        }
    },

    created() {
        this.research = this.$route.params.research;
        this.getTracksRequest();
    }
}
</script>

<style lang="scss" scoped>
</style>
