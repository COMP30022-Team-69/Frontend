<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12" md="3">
        <!-- Sidebar component -->
        <Sidebar :playlists="Object.keys(playlists)" @select="selectPlaylist" @updateLib="initSongs"/>
      </v-col>

      <v-col cols="12">
        <h2>{{ selectedPlaylist }}</h2>
        <v-virtual-scroll
          ref="virtualScroll"
          :items="playlists[selectedPlaylist].songs"
          :height="height-200"
          item-height="50"
          :bench="10"
          @scroll="handleScroll"
        >
          <template v-slot:default="{ item }">
            <SongCard :song="item" :deletable="selectedPlaylist !== 'Main Library'" @deleteSong="deleteSongFromList"/>
          </template>
        </v-virtual-scroll>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sidebar from "@/components/SideBar.vue";
import SongCard from "@/components/SongCard.vue";
import song from "@/js/song"
import SnackBar from "@/js/SnackBar";

export default {
  components: {
    Sidebar,
    SongCard
  },
  data() {
    return {
      page: 1,
      size: 20,
      height: window.innerHeight,
      playlists: {
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
      },
      selectedPlaylist: 'Main Library'
    };
  },
  methods: {
    deleteSongFromList(id) {
      const userId = this.$route.query.id;
      song.deleteSongToList(id, this.selectedPlaylist, userId, (response) => {
        if (response.data.code === 200) {
          SnackBar.Launch("Song deleted successfully!");
          song.getUserSongListById(this.page, this.size, this.selectedPlaylist, userId, (songsFromApi) => {
            this.playlists[this.selectedPlaylist].songs = songsFromApi.data.records;
          });
        } else {
          SnackBar.Launch("Error deleting song:", response.data.msg);
        }
      });
    },
    selectPlaylist(index) {
      const playlistNames = Object.keys(this.playlists);
      this.selectedPlaylist = playlistNames[index];
      this.page = 1;
      if (this.selectedPlaylist === 'Main Library') {
        song.getSongs(this.page, this.size, (songsFromApi) => {
          this.playlists['Main Library'].songs = songsFromApi.data.records;
        });
        return;
      }
      song.getUserSongListById(this.page, this.size, this.selectedPlaylist, this.$route.query.id, (songsFromApi) => {
        this.playlists[this.selectedPlaylist].songs = songsFromApi.data.records;
      });
    },
    handleScroll() {
      const {scrollTop, scrollHeight, clientHeight} = this.$refs.virtualScroll.$el;
      const closeToBottom = scrollTop + clientHeight > scrollHeight - 200;

      if (closeToBottom && !this.loading) {
        this.loadMore();
      }
    },
    loadMore() {
      this.loading = true;

      song.getSongs(this.page, this.size, (songsFromApi) => {
        if (songsFromApi.data.records.length === 0) {
          return;
        }
        this.playlists['Main Library'].songs = [...this.playlists['Main Library'].songs, ...songsFromApi.data.records];
        this.loading = false;
        this.page++;
      });
    },
    initSongs() {
      song.getSongs(this.page, this.size, (songsFromApi) => {
        this.playlists['Main Library'].songs = songsFromApi.data.records;
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
