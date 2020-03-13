<template>
    <div>
        <p>Artist details</p>
    </div>
</template>

<script>
import axios from 'axios';


export default {
    data() {
        return {
            api: {
                music: {
                    url: "http://musicbrainz.org/ws/2"
                }
            },
            artist: null
        }
    },

    methods: {
        fetchArtistData() {
            const url = `${this.api.music.url}/artist/${this.$route.params.id}`;
            console.log(url);
            
            axios.get(url)
            .then((res) => {
                this.artist = res.data;
                console.log(this.artist);
            }).catch(err => console.error(err));
        }
    },

    created() {
        this.fetchArtistData();        
    }
}
</script>

<style lang="scss">

</style>
