<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <div>
        <div>
            <img :src="imageSrc" alt="">
        </div>
        <div>
            <h3>{{data.title}}</h3>
        </div>
        <div>
            <span v-for="artist in artists"><router-link :to="`/artists/${artist.id}`">{{ artist.name }}</router-link></span>
        </div>
        <router-link :to="detailUrl">Go to details</router-link>    
    </div>
</template>

<script>
export default {
    props: ['data'],

    data() {
        return {
            api: {
                cover: {
                    url: "http://coverartarchive.org/release/"
                }
            }
        }
    },

    computed: {
        detailUrl() {
            return `/albums/${this.data.id}`;
        },
        artists() {
            let artists = [];
            if (this.data['artist-credit']) {
                this.data['artist-credit'].forEach(artist => artists.push(artist.artist));
            }
            return artists;
        },
        imageSrc() {
            return this.api.cover.url + this.data.id + "/front";
        }
    }
}
</script>

<style lang="scss">

</style>
