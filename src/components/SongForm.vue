<template>
  <v-card>
    <v-card-title>{{ update ? 'Update' : 'Upload' }} Song</v-card-title>
    <v-card-text>
      <v-text-field label="Song Name" v-model="songName" :rules="[rules.required]"></v-text-field>
      <v-text-field label="Artist" v-model="artist" :rules="[rules.required]"></v-text-field>
      <v-text-field label="Release Date" v-model="releaseDate" :rules="[rules.date,rules.required]"></v-text-field>
      <v-text-field label="Description" v-model="description" :rules="[rules.required]"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="close">Cancel</v-btn>
      <v-btn color="primary" @click="handleUpload">{{ update ? 'Update' : 'Upload' }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import songApi from "@/js/song";
import SnackBar from "@/js/SnackBar";
import moment from "moment";

export default {
  data() {
    return {
      songName: '',
      artist: '',
      releaseDate: '',
      description: "Song Description",
      rules: {
        required: value => !!value || 'Required.',
        date: value => moment(value, 'YYYY-MM-DD', true).isValid() || 'Invalid date format! yyyy-MM-dd'
      }
    };
  },
  computed: {
    update() {
      return this.song != null;
    }
  },
  created() {
    console.log(this.song)
    if (this.song != null) {
      this.songName = this.song.name;
      this.artist = this.song.author;
      this.releaseDate = this.song.releaseDate;
      this.description = this.song.description;
    }
  },
  props: {
    song: {
      type: Object,
      default: null
    },
  },
  methods: {
    handleUpload() {
      if (this.song != null) {
        songApi.updateSong({
          id: this.song.id,
          name: this.songName,
          author: this.artist,
          releaseDate: this.releaseDate,
          description: this.description
        }, () => {
          // Upload successful
          SnackBar.Launch("Update successful");
          this.$emit('close')
        }, (err) => {
          // Upload failed
          console.log(err)
          SnackBar.Launch("Update Failed");
        })
      } else {
        // Upload song to server
        songApi.uploadSong({
          name: this.songName,
          author: this.artist,
          releaseDate: this.releaseDate,
          description: this.description
        }, () => {
          // Upload successful
          SnackBar.Launch("Upload successful");
          this.$emit('close')
        }, (err) => {
          // Upload failed
          console.log(err)
          SnackBar.Launch("Upload Failed");
        })
      }
    },
    close() {
      this.$emit('close')
    }
  },
}
</script>
<style scoped>

</style>
