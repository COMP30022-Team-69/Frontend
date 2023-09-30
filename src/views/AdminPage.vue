<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12" md="3">
        <!-- AdminSidebar component -->
        <AdminSidebar :users="users" @selectPlaylist="selectPlaylist" />
      </v-col>

      <v-col cols="12" md="9">
        <div v-if="selectedUser && users[selectedUser] && selectedPlaylist && users[selectedUser].playlists[selectedPlaylist]">
          <h2>{{ selectedUser }} - {{ selectedPlaylist }}</h2>
          <SongCard v-for="song in users[selectedUser].playlists[selectedPlaylist].songs" :key="song.id" :song="song" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminSidebar from "@/components/AdminSideBar.vue";
import SongCard from "@/components/SongCard.vue";

export default {
  components: {
    AdminSidebar,
    SongCard
  },
  data() {
    return {
      users: {
        'Alice': {
          playlists: {
            'Favourite': {
              songs: [
                { id: 1, title: 'Song A', artist: 'Artist A' },
                { id: 2, title: 'Song B', artist: 'Artist B' },
              ]
            },
            'Background': {
              songs: [
                { id: 3, title: 'Song C', artist: 'Artist C' },
              ]
            },
            'Relax': {
              songs: [
                { id: 4, title: 'Song D', artist: 'Artist D' },
              ]
            },
            'Sleep': {
              songs: [
                { id: 5, title: 'Song E', artist: 'Artist E' },
              ]
            }
          }
        },
        'Bob': {
          playlists: {
            'Favourite': {
              songs: [
                { id: 6, title: 'Song F', artist: 'Artist F' },
              ]
            },
            'Background': {
              songs: [
                { id: 7, title: 'Song G', artist: 'Artist G' },
              ]
            },
            // ... other playlists for Bob
          }
        },
        // ... other users and their playlists
      },
      selectedUser: null,
      selectedPlaylist: null
    };
  },
  methods: {
    selectPlaylist(user, playlist) {
      this.selectedUser = user;
      this.selectedPlaylist = playlist;
    },
    // ... other methods, like logout (if you have them)
  }
};
</script>

<style scoped>
/* Add any specific styles for the AdminPage view here */
</style>
