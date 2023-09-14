<template>
  <v-navigation-drawer app permanent>
    <v-list>
      <v-list-item v-for="(playlist, index) in playlists" :key="index" @click="selectPlaylist(index)">
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
export default {
  data() {
    return {
      showUploadDialog: false,
      songName: '',
      artist: ''
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
        artist: this.artist
      };
      // Handle the upload logic here or emit an event with songData
      console.log("Uploading song:", songData);

      // Reset and close dialog
      this.songName = '';
      this.artist = '';
      this.showUploadDialog = false;
    }
  }
};
</script>

<style scoped>
/* Position the upload button to the lower left corner */
.upload-btn {
  position: absolute;
  bottom: 100px;
  left: 10px;
}
</style>
