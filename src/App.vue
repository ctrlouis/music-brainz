<!-- MAIN COMPONENT -->


<template>
  <div id="app">
    <form @submit="exec">
      <input type="text" placeholder="Search..." v-model="searched">
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

    <liste v-if="fetchData.type == 'album'" :albums="fetchData.data"></liste>
    <!-- <liste v-else-if="fetchData.type == 'artist'" :artists="fetchData.data"></liste> -->
    <!-- <liste v-else-if="fetchData.type == 'track'" :tracks="fetchData.data"></liste> -->
  </div>
</template>

<script>
import axios from 'axios';
import Liste from './components/Liste.vue';


export default {
  name: 'app',

  components: { Liste },

  data() {
    return {
      api: {
        music: {
          url: "http://musicbrainz.org/ws/2"
        }
      },
      searched: "",
      searchType: "",
      fetchData: {
        type: '',
        data: []
      }
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

    /*
    * Retrieve albums from music-brainz api
    */
    fetchAlbums(page=0) {
      const url = this.api.music.url + "/release-group?query=" + this.searched + "&" + this.calculPage(page);
      axios.get(url)
        .then((res) => {
          const albumsData = res.data;
          this.updateData(albumsData);
          this.fetchData.type = 'album';
          console.log(albumsData);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /*
    * Retrieve artists from music-brainz api
    */
    fetchArtists(page=0) {
      const url = this.api.music.url + "/artist?query=" + this.searched  + "&" + this.calculPage(page);;
      axios.get(url)
        .then((res) => {
          const artistsData = res.data;
          this.fetchData.type = 'artist';
          console.log(artistsData);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /*
    * Retrieve tracks from music-brainz api
    */
    fetchTracks(page=0) {
      const url = this.api.music.url + "/release?query=" + this.searched + "&" + this.calculPage(page);
      axios.get(url)
        .then((res) => {
          const tracksData = res.data;
          this.fetchData.type = 'track';
          console.log(tracksData);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /*
    * Calcule page and offest query options
    */
    calculPage(pageNbr=0, pageSize=100) {
      const offset = pageNbr * pageSize;
      return "limite=" + pageSize + "&offset=" + offset;
    },

    /*
    * Retrieve tracks from music-brainz api
    */
    updateData(datas) {
      // console.log(datas);
      this.fetchData.data = datas;
      console.log(this.fetchData.data);
      // while (this.fetchData.data.length > 0) this.fetchData.data.unshift();
      // datas.forEach(data => this.fetchData.data.push(data));
    }
  },

  created() {}
}
</script>

<style lang="scss">

</style>
