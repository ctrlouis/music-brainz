<template>
  <div id="app">
    <form @submit="exec">
      <input type="text" placeholder="Search..." v-model="searched"></input>
      <br>
      <input type="radio" id="album" value="album" v-model="searchType">
      <label for="two">Album</label>
      <br>
      <input type="radio" id="artist" value="artist" v-model="searchType">
      <label for="one">Artist</label>
      <br>
      <input type="radio" id="track" value="track" v-model="searchType">
      <label for="two">Track</label>
      <br>
    </form>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'app',

  data() {
    return {
      api: {
        music: {
          url: "http://musicbrainz.org/ws/2"
        }
      },
      searched: "",
      searchType: ""
    }
  },

  methods: {
    exec(event) {
      event.preventDefault();
      switch (this.searchType) {
        case "album":
          this.fetchAlbums(this.searched);
          break;
        case "artist":
          this.fetchArtists(this.searched);
          break;
        case "track":
          this.fetchTracks(this.searched);
          break;
      
        default:
          break;
      }
    },
    fetchAlbums(page=0) {
      const url = this.api.music.url + "/release-group?query=" + this.searched + "&" + this.calculPage(page);
      axios.get(url)
        .then((res) => {
          const albums = res.data;
          console.log(albums);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchArtists(page=0) {
      const url = this.api.music.url + "/artist?query=" + this.searched  + "&" + this.calculPage(page);;
      axios.get(url)
        .then((res) => {
          const artists = res.data;
          console.log(artists);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchTracks(page=0) {
      const url = this.api.music.url + "/release?query=" + this.searched + "&" + this.calculPage(page);
      axios.get(url)
        .then((res) => {
          const tracks = res.data;
          console.log(tracks);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    calculPage(pageNbr=0, pageSize=100) {
      const offset = pageNbr * pageSize;
      return "limite=" + pageSize + "&offset=" + offset;
    }
  },

  created() {}
}
</script>

<style lang="scss">

</style>
