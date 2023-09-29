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
        @drop="handleDrop(index)"
      >
        <v-list-item-title>{{ playlist }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-btn class="upload-btn" @click="showUploadDialog = true">Upload</v-btn>

    <!-- Upload Dialog -->
    <v-dialog v-model="showUploadDialog" max-width="500px">
      <v-card>
        <v-card-title>Upload Song</v-card-title>
        <v-card-text>
          <v-text-field label="Song Name" v-model="songName"></v-text-field>
          <v-text-field label="Artist" v-model="artist"></v-text-field>
          <!-- You can add more fields as needed for other song details -->
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

export default {
  data() {
    return {
      showUploadDialog: false,
      songName: '',
      artist: ''
      // Add other song details if needed
    };
  },
  props: {
    playlists: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectPlaylist(index) {
      this.$emit('select', index);
    },
    handleUpload() {
      const songData = {
        name: this.songName,
        author: this.artist,
        description: "Song Description",
        releaseDate: "2023-09-17"
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
    handleDrop(index, event) {
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
}

v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
