<template>
  <v-container class="mt-4">
    <v-row>
      <v-btn flat @click="goback">
        <v-icon>mdi-arrow-left</v-icon>
        BACK
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>Song Management</h2>
        <v-data-table-server
          v-model:items-per-page="size"
          :items="userList"
          :headers="headers"
          :items-length="totalItems"
          :loading="loading"
          @update:options="loadSongs"
          :height="height-250"
        >
          <template v-slot:item.actions="{ item }">
            <v-row>
              <v-btn @click="showUpdate(item.raw)" icon="mdi-pencil" variant="text"/>
              <v-btn @click="deleteSong(item.raw)" icon="mdi-delete" variant="text"/>
            </v-row>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" max-width="500px">
      <SongForm :song="songSelected" @close="updateFinish"/>
    </v-dialog>
  </v-container>
</template>

<script>
import {VDataTableServer} from 'vuetify/labs/VDataTable'
import SongForm from "@/components/SongForm";
import song from "@/js/song";
import SnackBar from "@/js/SnackBar";
import {store} from "@/store";

export default {
  components: {
    VDataTableServer,
    SongForm
  },
  data() {
    return {
      page: 1,
      size: 15,
      userList: [],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
      songSelected: null,
      showDialog: false,
      height: window.innerHeight,
      headers: [
        {title: 'id', key: 'id', sortable: false},
        {title: 'title', key: 'name', sortable: false},
        {title: 'author', key: 'author', sortable: false},
        {title: 'Release Time', key: 'releaseDate', sortable: false},
        {title: 'Create Time', key: 'createTime', sortable: false},
        {title: 'Actions', key: 'actions', sortable: false},
      ],
    };
  },
  created() {
    this.loadSongs({page: this.page, itemsPerPage: this.size})
  },
  methods: {
    deleteSong(item) {
      song.deleteSong(item.id, () => {
        SnackBar.Launch("Song deleted!")
        this.loadSongs({page: this.page, itemsPerPage: this.size})
      })
    },
    showUpdate(item) {
      this.songSelected = item;
      this.showDialog = true;
    },
    updateFinish() {
      this.showDialog = false;
      this.loadSongs({page: this.page, itemsPerPage: this.size})
    },
    goback() {
      this.$router.back(-1)
    },
    selectPlaylist(user, playlist) {
      this.selectedUser = user;
      this.selectedPlaylist = playlist;
    },
    loadSongs({page, itemsPerPage, sortBy}) {
      this.loading = true
      this.page = page
      this.size = itemsPerPage
      song.getSongs(page, itemsPerPage, (res) => {
        this.userList = res.data.records
        this.totalItems = res.data.total
        this.loading = false
      })
    }
  }
};
</script>

<style scoped>
/* Add any specific styles for the AdminPage view here */
</style>
