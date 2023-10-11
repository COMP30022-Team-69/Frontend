<template>
  <v-app>
    <Appbar v-if="showAppBar"></Appbar>
    <Sidebar :playlists="Object.keys(store.state.playlists)" @select="selectPlaylist" @updateLib="initSongs" v-if="showAppBar"/>
    <v-main class="no-scroll">
      <router-view/>
      <SnackBar/>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from "@/components/Appbar.vue";
import SnackBar from "@/components/SnackBar.vue";
import Sidebar from "@/components/SideBar.vue";
import {store} from "@/store";
import song from "@/js/song";

export default {
  computed: {
    store() {
      return store
    }
  },
  components: {
    Sidebar,
    Appbar,
    SnackBar
  },
  data() {
    return {
      showAppBar: true
    };
  },
  methods: {
    selectPlaylist(index) {
      const playlistNames = Object.keys(store.state.playlists);
      store.state.selectedPlaylist = playlistNames[index];
    },
    initSongs() {
      store.state.page = 1
      store.state.playlists = {
        'Main Library': {
          name: 'Main Library',
          songs: []
        },
        'Favourite': {
          name: 'Favourite',
          songs: []
        },
        'Background': {
          name: 'Background',
          songs: []
        },
        'Relax': {
          name: 'Relax',
          songs: []
        },
        'Sleep': {
          name: 'Sleep',
          songs: []
        }
      }
      if (store.state.selectedPlaylist === 'Main Library') {
        song.getSongs(1, store.state.size, (songsFromApi) => {
          store.state.playlists['Main Library'].songs = songsFromApi.data.records;
        });
        return;
      }
      song.getUserSongListById(1, store.state.size, store.state.selectedPlaylist, this.$route.query.id, (songsFromApi) => {
        store.state.playlists[store.state.selectedPlaylist].songs = songsFromApi.data.records;
      });
      this.$forceUpdate();
    }
  },
  created() {

  },
  watch: {
    $route(to, from) {
      this.showAppBar = !(to.path === "/user" || to.path === "/login" || to.path === "/register");
    }
  }
};
</script>
<style>
.no-scroll {
  overflow: hidden;
}
</style>
