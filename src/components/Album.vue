<!-- ALBUM DISPLAYER COMPONENTS -->

<template>
    <router-link :to="detailUrl" class="card col-6 col-s-4 col-l-3 col-xl-2">
        <div class="cover">
            <img v-if="imgLoad" :src="imageSrc" alt="" @error="onImgError">
            <div v-else class="fakeCover"></div>
        </div>
        <div>
            <h3>{{data.title}}</h3>
        </div>
        <div v-if="artists.length > 0" class="info">
            <div v-if="artists.length == 1">
                Artist:
            </div>
            <div v-else-if="artists.length > 1">
                Artists:
            </div>
            <div>
                <router-link v-for="artist in artists" :to="`/artists/${artist.id}`">{{ artist.name }}</router-link>
            </div>
        </div>
        <div v-if="data['track-count']" class="info">
            <div>Tracks</div>
            <div>{{data['track-count']}}</div>
        </div>
    </router-link>    
</template>

<script>
export default {
    props: ['data'],

    data() {
        return {
            imgLoad: true,
            api: {
                cover: {
                    url: "http://coverartarchive.org/release/"
                }
            }
        }
    },

    methods: {
        onImgError() {
            this.imgLoad = !this.imgLoad;
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
.cover {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
}
.fakeCover {
    width: 10em;
    height: 10em;
    border: 2px solid white;
}
</style>
