<template>
  <v-container class="mt-4">
    <v-row>
      <v-btn flat @click="goback"><v-icon>mdi-arrow-left</v-icon>BACK</v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>User Management</h2>
        <v-data-table-server
          v-model:items-per-page="size"
          :items="userList"
          :headers="headers"
          :items-length="totalItems"
          :loading="loading"
          @update:options="loadUsers"
        >

        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import SongCard from "@/components/SongCard.vue";
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import user from "@/js/user";

export default {
  components: {
    VDataTableServer
  },
  data() {
    return {
      page: 1,
      size: 20,
      userList: [],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
      headers: [
        {title: 'id', key: 'id', sortable: false},
        { title: 'name', key: 'username', sortable: false },
        { title: 'email', key: 'email', sortable: false },
        { title: 'Join Time', key: 'createTime', sortable: false },
      ],
    };
  },
  created() {
    this.loadUsers()
  },
  methods: {
    goback(){
      this.$router.back(-1)
    },
    selectPlaylist(user, playlist) {
      this.selectedUser = user;
      this.selectedPlaylist = playlist;
    },
    loadUsers(){
      this.loading = true
      user.getAllUser(this.page, this.size, (res) => {
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
