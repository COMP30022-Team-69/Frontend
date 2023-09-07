<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="8">
        <v-card>
          <v-card-title>
            <v-btn flat @click="goback"><v-icon>mdi-arrow-left</v-icon>BACK</v-btn>
          </v-card-title>
          <v-card-text>
            <v-row class="d-flex justify-center mb-5">
              <v-col>
                <v-img src="undraw_my_password_re_ydq7.svg" max-height="100"></v-img>
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
                        <v-label>Ling Bao</v-label>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        Email:
                      </v-col>
                      <v-col>
                        <v-label>xxxxxxx@gmail.com</v-label>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        Join Date:
                      </v-col>
                      <v-col>
                        <v-label>19/09/2023</v-label>
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
                        <v-btn block color="blue">UPDATE EMAIL</v-btn>
                      </v-col>
                      <v-col>
                        <v-btn block color="blue">UPDATE PASSWORD</v-btn>
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
export default {
  components: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    goback(){
      this.$router.back(-1)
    }
  },
};
</script>
<style scoped>

</style>
