<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8" sm="12" lg="8">
        <v-card>
          <v-card-title>
            <v-btn flat @click="goback"><v-icon>mdi-arrow-left</v-icon>BACK</v-btn>
          </v-card-title>
          <v-card-text>
            <v-row class="d-flex justify-center mb-5">
              <v-col>
                <v-img src="/public/undraw_my_password_re_ydq7.svg" max-height="100"></v-img>
              </v-col>
            </v-row>
            <v-card class="mb-5" >
              <v-card-title>Profiles</v-card-title>
              <v-card-text>
                <v-row class="d-flex justify-center">
                  <v-col>
                    <v-row>
                      <v-col>
                        Username:
                      </v-col>
                      <v-col>
                        <v-label>{{store.state.user.data.username}}</v-label>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        Email:
                      </v-col>
                      <v-col>
                        <v-label>{{store.state.user.data.email}}</v-label>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        Join Date:
                      </v-col>
                      <v-col>
                        <v-label>{{parseDate(store.state.user.data.createTime)}}</v-label>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card>
              <v-card-title>Security</v-card-title>
              <v-card-text>
                <v-row class="d-flex justify-center">
                  <v-col>
                    <v-row>
                      <v-col>
                        <ChangeEmailDialog />
                      </v-col>
                      <v-col>
                        <ChangePasswordDialog />
                      </v-col>
                    </v-row>

                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {store} from "../store";
import user from "@/js/user";
import ChangePasswordDialog from "@/components/ChangePasswordDialog.vue";
import ChangeEmailDialog from "@/components/ChangeEmailDialog.vue";

export default {
  computed: {
    store() {
      return store
    }
  },
  components: {
    ChangePasswordDialog,
    ChangeEmailDialog
  },
  data() {
    return {
    };
  },
  created() {
    user.getUser((res) => {
      store.state.user.data = res.data
    })
  },
  methods: {
    goback(){
      this.$router.back(-1)
    },
    parseDate(date){
      return new Date(date).toLocaleString()
    }
  },
};
</script>
<style scoped>

</style>
