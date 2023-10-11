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
        <h2>User Management</h2>
        <v-data-table-server
          v-model:items-per-page="size"
          :items="userList"
          :headers="headers"
          :items-length="totalItems"
          :loading="loading"
          @update:options="loadUsers"
          :height="height-250"
        >
          <template v-slot:item.actions="{ item }">
            <v-row>
              <v-btn @click="showUpdate(item.raw)" icon="mdi-pencil" variant="text"/>
              <v-btn @click="updateUserAuth(item.raw)" icon="mdi-account-key" variant="text"/>
            </v-row>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" max-width="500px">
      <UserAuth :usr="selected" @close="closeDialog"/>
    </v-dialog>
  </v-container>
</template>

<script>
import {VDataTableServer} from 'vuetify/labs/VDataTable'
import user from "@/js/user";
import UserAuth from "@/components/UserAuthForm";
import {store} from "@/store";

export default {
  components: {
    UserAuth,
    VDataTableServer
  },
  computed: {
    selected() {
      if (this.selectedUser == null) return null
      return {
        id: this.selectedUser.id,
        authority: this.selectedUser.authorities[0].authority
      }
    }
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
      showDialog: false,
      selectedUser: null,
      height: window.innerHeight,
      headers: [
        {title: 'id', key: 'id', sortable: false},
        {title: 'name', key: 'username', sortable: false},
        {title: 'email', key: 'email', sortable: false},
        {title: 'Join Time', key: 'createTime', sortable: false},
        {title: 'Actions', key: 'actions', sortable: false},
      ],
    };
  },
  created() {
    this.loadUsers({page: this.page, itemsPerPage: this.size})
  },
  methods: {
    updateUserAuth(usr) {
      this.selectedUser = usr
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
      this.loadUsers()
    },
    goback() {
      this.$router.back(-1)
    },
    showUpdate(user) {
      this.$router.push({path: '/', query: {id: user.id}})
    },
    selectPlaylist(user, playlist) {
      this.selectedUser = user;
      this.selectedPlaylist = playlist;
    },
    loadUsers({page, itemsPerPage, sortBy}) {
      this.loading = true
      user.getAllUser(page, itemsPerPage, (res) => {
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
