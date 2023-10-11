<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>{{ store.state.selectedPlaylist }}</h2>
        <v-infinite-scroll :items="store.state.playlists[store.state.selectedPlaylist].songs" :onLoad="loadMore">
          <template v-for="(item, index) in store.state.playlists[store.state.selectedPlaylist].songs" :key="item">
            <SongCard :song="item" :deletable="store.state.selectedPlaylist !== 'Main Library'"
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
          song.getUserSongListById(store.state.page, store.state.size, store.state.selectedPlaylist, userId, (songsFromApi) => {
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
      this.loading = true;

      song.getSongs(store.state.page, store.state.size, (songsFromApi) => {
        if (songsFromApi.data.records.length === 0) {
          done('empty');
          return;
        }
        store.state.playlists['Main Library'].songs = [...store.state.playlists['Main Library'].songs, ...songsFromApi.data.records];
        this.loading = false;
        store.state.page++;
        done('ok');
      });
    },
    initSongs() {
      song.getSongs(store.state.page, store.state.size, (songsFromApi) => {
        store.state.playlists['Main Library'].songs = songsFromApi.data.records;
      });
    }
  },
  created() {
    this.initSongs();
  }
};
</script>

<style scoped>
/* Add any specific styles for the Home view here */
</style>
