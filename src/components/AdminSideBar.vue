<template>
  <v-navigation-drawer app>
    <v-list dense>
      <v-list-item-group v-for="(userPlaylists, user) in users" :key="user">
        <v-list-item @click="toggleUser(user)">
          <v-list-item-content>
            <v-list-item-title>{{ user }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="activeUser === user" v-for="(playlistSongs, playlist) in userPlaylists.playlists" :key="playlist" @click="selectPlaylist(playlist)" class="playlist-item">
          <v-list-item-content>
            <v-list-item-title>{{ playlist }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.playlist-item {
  margin-left: 16px; /* You can adjust the indentation by changing the margin value */
}
</style>

<script>
export default {
  props: {
    users: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeUser: null
    };
  },
  methods: {
    toggleUser(user) {
      this.activeUser = this.activeUser === user ? null : user;
    },
    selectPlaylist(playlist) {
      this.$emit('selectPlaylist', this.activeUser, playlist);
    }
  }
};
</script>
