<template>
  <v-navigation-drawer app :permanent="showSidebar" :width="160">
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
        <v-list-item-title
          :class="greenReady && playlist !== viewingLibrary && playlist !== 'Main Library' ? 'on-drop' : 'not-drop'">
          {{ playlist }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-btn class="upload-btn" @click="showUploadDialog = true" v-show="showUploadButton">Upload</v-btn>
    <v-btn class="user-btn" @click="gotoUserManager" v-show="showUploadButton">User</v-btn>
    <v-btn class="song-btn" @click="gotoSongManager" v-show="showUploadButton">Song</v-btn>

    <!-- Upload Dialog -->
    <v-dialog v-model="showUploadDialog" max-width="500px">
      <SongForm @close="addFinish"/>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import song from '@/js/song';
import {store} from "@/store";
import user from "@/js/user";
import Cookies from "js-cookie";
import SnackBar from "@/js/SnackBar";
import SongForm from "@/components/SongForm.vue";

export default {
  components: {
    SongForm
  },
  computed: {
    showSidebar() {
      if (this.$route.path === '/admin/user' || this.$route.path === '/admin/song' || this.$route.path === '/login' || this.$route.path === '/register') return false
      return !store.state.isMobile
    },
    greenReady() {
      return store.state.dragStarted
    },
    viewingLibrary() {
      return store.state.selectedPlaylist
    },
  },
  data() {
    return {
      showUploadButton: false,
      showUploadDialog: false,
      isMobile: false
    };
  },
  props: {
    playlists: {
      type: Array,
      required: true
    }
  },
  mounted() {
    if (Cookies.get('access_token') === undefined) {
      this.$router.push('/login')
      return
    }
    user.getUser(res => {
      store.state.user.data = res.data
      this.showUploadButton = res.data.authorities[0].authority === "admin"
    })
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      store.state.isMobile = window.innerWidth <= 768;
    },
    selectPlaylist(index) {
      store.selectedPlaylist = this.playlists[index];
      this.$emit('select', index);
    },
    gotoUserManager() {
      this.$router.push('/admin/user')
    },
    gotoSongManager() {
      this.$router.push('/admin/song')
    },
    addFinish() {
      this.showUploadDialog = false;
      this.$emit('updateLib')
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

      const userId = this.$route.query.id;
      const songListName = this.playlists[index];
      song.addSongToList(droppedSong.id, songListName, userId, (response) => {
        if (response.data.code === 200) {
          SnackBar.Launch("Song added successfully!");
        } else {
          SnackBar.Launch("Error adding song:", response.data.msg);
        }
      });
    },
  }
};
</script>

<style scoped>
.upload-btn {
  position: absolute;
  bottom: 20px;
  left: 10px;
  width: 140px;
}

.user-btn {
  position: absolute;
  bottom: 70px;
  left: 10px;
  width: 140px;
}

.song-btn {
  position: absolute;
  bottom: 120px;
  left: 10px;
  width: 140px;
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
