<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>{{ selectedPlaylist }}</h2>
        <v-infinite-scroll :items="playlists[selectedPlaylist].songs" :onLoad="loadMore">
          <template v-for="(item, index) in playlists[selectedPlaylist].songs" :key="item">
            <SongCard :song="item" :deletable="selectedPlaylist !== 'Main Library'"
                      @deleteSong="deleteSongFromList"/>
          </template>
        </v-infinite-scroll>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sidebar from "@/components/SideBar.vue";
import SongCard from "@/components/SongCard.vue";
import song from "@/js/song"
import SnackBar from "@/js/SnackBar";
import {store} from "@/store";
import {VInfiniteScroll} from 'vuetify/labs/VInfiniteScroll'

export default {
  computed: {
    selectedPlaylist() {
      return store.state.selectedPlaylist;
    },
    page() {
      return store.state.page;
    },
    playlists() {
      return store.state.playlists;
    },
    store() {
      return store
    }
  },
  components: {
    Sidebar,
    SongCard,
    VInfiniteScroll
  },
  data() {
    return {
      height: window.innerHeight,
    };
  },
  methods: {
    deleteSongFromList(id) {
      const userId = this.$route.query.id;
      song.deleteSongToList(id, store.state.selectedPlaylist, userId, (response) => {
        if (response.data.code === 200) {
          SnackBar.Launch("Song deleted successfully!");
          song.getUserSongListById(1, store.state.size, store.state.selectedPlaylist, userId, (songsFromApi) => {
            store.state.playlists[store.state.selectedPlaylist].songs = songsFromApi.data.records;
          });
        } else {
          SnackBar.Launch("Error deleting song:", response.data.msg);
        }
      });
    },
    // handleScroll() {
    //   const {scrollTop, scrollHeight, clientHeight} = this.$refs.virtualScroll.$el;
    //   const closeToBottom = scrollTop + clientHeight > scrollHeight - 200;
    //
    //   if (closeToBottom && !this.loading) {
    //     this.loadMore('ok');
    //   }
    // },
    loadMore({done}) {
      if (store.state.selectedPlaylist === 'Main Library') {
        song.getSongs(store.state.page, store.state.size, (songsFromApi) => {
          if (songsFromApi.data.records.length === 0) {
            done('empty');
            return;
          }
          if (store.state.page === 1){
            store.state.playlists['Main Library'].songs = [];
          }
          store.state.playlists['Main Library'].songs = [...store.state.playlists['Main Library'].songs, ...songsFromApi.data.records];
          console.log(store.state.page)
          store.state.page++;
          done('ok');
        });
        return;
      }
      song.getUserSongListById(store.state.page, store.state.size, store.state.selectedPlaylist, this.$route.query.id, (songsFromApi) => {
        console.log(store.state.page)
        if (songsFromApi.data.records.length === 0) {
          done('empty');
          return;
        }
        if (store.state.page === 1){
          store.state.playlists[store.state.selectedPlaylist].songs = [];
        }
        store.state.playlists[store.state.selectedPlaylist].songs = [...store.state.playlists[store.state.selectedPlaylist].songs, ...songsFromApi.data.records];

        store.state.page++;
        done('ok');
      });
    },
  },
  watch:{
    page(oldValue, newValue){
      if (newValue - oldValue === 1) return;
      if (oldValue > newValue) return;
      if (newValue > oldValue && newValue - oldValue !== 1){
        // store.state.page = oldValue += 1;
      }
    },
    $route(to, from) {
      store.state.page = 1;
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
    },
    selectedPlaylist(newValue, oldValue) {
      if (newValue === 'Main Library') {
        song.getSongs(1, store.state.size, (songsFromApi) => {
          store.state.playlists['Main Library'].songs = songsFromApi.data.records;
        });
        return;
      }
      song.getUserSongListById(1, store.state.size, newValue, this.$route.query.id, (songsFromApi) => {
        store.state.playlists[newValue].songs = songsFromApi.data.records;
      });
      this.$forceUpdate();
    }
  },
  created() {
  }
};
</script>

<style scoped>
/* Add any specific styles for the Home view here */
</style>
