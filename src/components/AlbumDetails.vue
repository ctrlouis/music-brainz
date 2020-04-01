/*
* PAGE
* Display all album information
*/
<template>
    <div>
        <SearchForm @newSearch="onNewSearch"></SearchForm>
        <div v-if="loaded && !error.set">

            <!-- album informations  -->
            <div class="album">
                <div v-if="imgLoad" class="cover">
                    <img :src="imageSrc" alt="" @error="onImgError">
                </div>
                <div class="info">
                    <h2>{{fetchData.album.data.title}}</h2>
                    <p>By <router-link v-for="artist in artists" :to="`/artists/${artist.id}`">{{ artist.name }}</router-link></p>
                    <p class="date">{{fetchData.album.data.date}}</p>
                </div>
            </div>

            <!-- albums tracks -->
            <div>
                <h2><i class="fas fa-music"></i> Tracks :</h2>
                <div v-if="fetchData.tracks">
                    <table>
                        <thead>
                            <tr>
                                <th><h4>Title</h4></th>
                                <th><h4>Time</h4></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Track v-for="track in fetchData.tracks.data.recordings" :data="track" :info="{title: true, time: true}"></Track>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

        <Loader v-else-if="!error.set"></Loader>
        <Error v-else>{{error.message}}</Error>
    </div>
</template>

<script>
import axios from 'axios';
import Album from './Album.vue';
import Track from './Track.vue';
import SearchForm from './SearchForm.vue';
import Loader from './Loader.vue';
import Error from './Error.vue';


export default {
    components: { Album, Track, SearchForm, Loader, Error },

    data() {
        return {
            id: null,
            fetchData: {
                album: null,
                tracks: null
            },
            imgLoad: true,
            api: {
                music: {
                    url: "https://musicbrainz.org/ws/2"
                },
                cover: {
                    url: "http://coverartarchive.org/release/"
                }
            },
            error: {
                set: false,
                message: ""
            }
        }
    },

    methods: {
        searchAll(research) {
            /*
            * fetch all albums data (self informations, tracks) from music brainz api
            */
            const requests = [this.getAlbumRequest(), this.getTracksRequest()];
            axios.all(requests)
            .then(axios.spread((album, tracks) => {
                this.fetchData.album = album;
                console.log(this.fetchData.album);
                this.fetchData.tracks = tracks;
                console.log(this.fetchData.tracks);
                console.table(this.artists);
            })).catch(err => this.setError());
        },

        getAlbumRequest() {
            /*
            * @return request for fetching informations about the current album
            */
            const url = this.api.music.url + "/release/" + this.id + "?inc=artists&fmt=json";
            return axios.get(url);
        },

        getTracksRequest() {
            /*
            * @return request for fetching tracks of the current album
            */
            const url = this.api.music.url + "/recording/?release=" + this.id + "&fmt=json";
            return axios.get(url);
        },

        onImgError() {
            /*
            * toggle imageLoad boolean significating there is no cover loaded
            */
            this.imgLoad = !this.imgLoad;
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
        artists() {
            /*
            * @return array containings artists of the albums and them data
            */
            let artists = [];
            if (this.fetchData.album.data['artist-credit']) {
                this.fetchData.album.data['artist-credit'].forEach(artist => artists.push(artist.artist));
            }
            return artists;
        },
        imageSrc() {
            /*
            * @return url to album cover
            */
            return this.api.cover.url + this.fetchData.album.data.id + "/front";
        },
        loaded() {
            /*
            * @return true if some data had already been fetch
            */
            return this.fetchData.album || this.fetchData.tracks;
        }
    },

    created() {
        /*
        * on component creation,
        * start fetching data
        */
        this.id = this.$route.params.id;
        this.searchAll();
    }
}
</script>

<style lang="scss">
.album {
    display: flex;
    flex-direction: row;
    margin-top: 2em;

    .cover {
        width: 30%;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .info {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        padding-left: 3em;

        h2 {
            text-align: left;
        }
    }
}
img {
  max-width: 100%;
  max-height: 100%;
}
.date {
    color: grey;
}
</style>
