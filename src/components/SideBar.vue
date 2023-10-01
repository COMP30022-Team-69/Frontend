<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <v-list-item
        v-for="(playlist, index) in playlists"
        :key="index"
        @click="selectPlaylist(index)"
        @dragover.prevent
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @drop="handleDrop($event, index)"
      >
        <v-list-item-title :class="greenReady && playlist !== viewingLibrary && playlist !== 'Main Library' ? 'on-drop' : 'not-drop'">{{ playlist }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-btn class="upload-btn" @click="showUploadDialog = true" v-show="showUploadButton">Upload</v-btn>
    <v-btn class="user-btn" @click="gotoAdminPage" v-show="showUploadButton">User</v-btn>
    <v-btn class="song-btn" @click="gotoAdminPage" v-show="showUploadButton">Song</v-btn>

    <!-- Upload Dialog -->
    <v-dialog v-model="showUploadDialog" max-width="500px">
      <v-card>
        <v-card-title>Upload Song</v-card-title>
        <v-card-text>
          <v-text-field label="Song Name" v-model="songName"></v-text-field>
          <v-text-field label="Artist" v-model="artist"></v-text-field>
          <v-text-field label="Release Date" v-model="releaseDate"></v-text-field>
          <v-text-field label="Description" v-model="description"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="showUploadDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="handleUpload">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import song from '@/js/song';
import {store} from "@/store";
import user from "@/js/user";
import Cookies from "js-cookie";

export default {
  computed: {
    greenReady() {
      return store.state.dragStarted
    },
    viewingLibrary() {
      return store.state.viewingLibrary
    },
  },
  watch: {
    greenReady(newValue, oldValue) {
      console.log("The count has changed from", oldValue, "to", newValue);
    }
  },
  data() {
    return {
      showUploadButton: false,
      showUploadDialog: false,
      songName: '',
      artist: '',
      releaseDate: new Date().toLocaleString(),
      description: "Song Description"
      // Add other song details if needed
    };
  },
  props: {
    playlists: {
      type: Array,
      required: true
    }
  },
  mounted() {
    if (Cookies.get('access_token') === undefined){
      this.$router.push('/login')
      return
    }
    user.getUser(res => {
      store.state.user.data = res.data
      this.showUploadButton = res.data.authorities[0].authority === "admin"
    })
  },
  methods: {
    selectPlaylist(index) {
      store.viewingLibrary = this.playlists[index];
      this.$emit('select', index);
    },
    gotoAdminPage() {
      this.$router.push('/admin')
    },
    handleUpload() {
      const songData = {
        name: this.songName,
        author: this.artist,
        description: this.description,
        releaseDate: this.releaseDate
        // Add other song details if needed
      };

      song.uploadSong(songData, (response) => {
        if (response.data.code === 200) {
          console.log("Song uploaded successfully:", response.data.msg);
          this.$emit('songUploaded', songData);
        } else {
          console.error("Server error:", response.data.msg);
        }

        this.songName = '';
        this.artist = '';
        this.showUploadDialog = false;
      });
    },
    handleDragEnter(event) {
      event.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    },
    handleDragLeave(event) {
      event.target.style.backgroundColor = '';
    },
    handleDrop(event, index) {
      const droppedSong = JSON.parse(event.dataTransfer.getData('text/plain'));
      event.target.style.backgroundColor = '';

      // Assuming you have a way to get the current user's ID
      const userId = this.$store.state.user.data.id;
      const songListName = this.playlists[index]; // Assuming playlists is an array of playlist names

      // Use the addSongToList function
      song.addSongToList(droppedSong.id, songListName, userId, (response) => {
        if (response.data.code === 0) {
          console.log("Song added successfully:", response.data.msg);
          // Optionally, provide feedback to the user, e.g., using a toast notification
        } else {
          console.error("Error adding song:", response.data.msg);
          // Optionally, handle the error, e.g., show an error message to the user
        }
      });
    },
  }
};
</script>

<style scoped>
.upload-btn {
  position: absolute;
  bottom: 100px;
  left: 10px;
  width: 235px;
}

.user-btn {
  position: absolute;
  bottom: 150px;
  left: 10px;
  width: 235px;
}

.song-btn {
  position: absolute;
  bottom: 200px;
  left: 10px;
  width: 235px;
}

v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.not-drop {
  padding: 10px;
}

.on-drop {
  border: 3px solid green;
  border-radius: 8px;
  background-color: #9cffb1;
  padding: 10px;
}
</style>
