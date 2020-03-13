<template>
    <div>
        <p>Artist details</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            api: {
                music: {
                    url: "http://musicbrainz.org/ws/2"
                }
            },
        }
    },

    methods: {
        fetchArtistData() {
            const url = `${this.api.music.url}/artists/${this.$route.params.id}`;

        }
    },

    created() {
        this.fetchArtistData();        
    }
}
</script>

<style lang="scss">

</style>
