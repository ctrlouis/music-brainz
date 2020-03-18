<template>
    <div>
        <div v-if="fetchData.albums">
            <Album v-for="album in fetchData.albums" :data="album"></Album>
            <button v-if="fetchData.albums.length < fetchData.count" @click="onLoadMore">Load more</button>
        </div>
        <p v-else>Loading</p>
    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';


export default {
    components: { Album },

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
                albums: null
            }
        }
    },

    methods: {
        fetchAlbums() {
            const url = this.api.music.url + "/release-group?query=" + this.research + "&" + this.calculPage() + "&fmt=json";
            axios.get(url)
            .then(res => {
                this.fetchData.count = res.data.count;
                this.fetchData.albums = res.data['release-groups'];
            })
            .catch(err => console.error(err));
        },

        calculPage(pageNbr=0, pageSize=25) {
            const offset = pageNbr * pageSize;
            return "limite=" + pageSize + "&offset=" + offset;
        },

        onLoadMore() {
            this.pageNbr++;
            const url = this.api.music.url + "/release-group?query=" + this.research + "&" + this.calculPage(this.pageNbr) + "&fmt=json";
            axios.get(url)
            .then(res => res.data['release-groups'].forEach(album => this.fetchData.albums.push(album)))
            .catch(err => console.error(err));
        }
    },

    created() {
        this.research = this.$route.params.research;
        this.fetchAlbums();
    }
}
</script>

<style lang="scss" scoped>
</style>
