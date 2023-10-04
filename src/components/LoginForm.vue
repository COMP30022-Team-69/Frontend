<template>
  <v-card
    class="mx-auto pa-12 pb-8"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <v-row class="d-flex justify-center mb-5">
      <v-img src="/public/undraw_my_password_re_ydq7.svg" max-width="100"></v-img>
    </v-row>

    <div class="text-subtitle-1 text-medium-emphasis">Username</div>

    <v-text-field
      density="compact"
      placeholder="Username"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :error="wrongPasswordOrUsername"
      :error-messages="wrongPasswordOrUsername ? 'Wrong password or username' : ''"
      v-model="username"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      Password
<!--      <a-->
<!--        class="text-caption text-decoration-none text-blue"-->
<!--        href="#"-->
<!--        rel="noopener noreferrer"-->
<!--        target="_blank"-->
<!--      >-->
<!--        Forgot login password?-->
<!--      </a>-->
    </div>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      v-model="password"
      :error="wrongPasswordOrUsername"
      @click:append-inner="visible = !visible"
    ></v-text-field>
    <br>
    <v-btn
      block
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      @click="login"
      :loading="loginLoading"
    >
      Log In
    </v-btn>

    <!-- Newly added Register link -->
    <v-card-text class="text-center">
      <a
        class="text-blue text-decoration-none"
        href="#"
        @click.prevent="goToRegister"
      >
        Don't have an account? Register
      </a>
    </v-card-text>

<!--    <v-card-text class="text-center">-->
<!--      <a-->
<!--        class="text-blue text-decoration-none"-->
<!--        href="#"-->
<!--        rel="noopener noreferrer"-->
<!--        target="_blank"-->
<!--      >-->
<!--        Browse as a guest <v-icon icon="mdi-chevron-right"></v-icon>-->
<!--      </a>-->
<!--    </v-card-text>-->
  </v-card>
</template>

<script>
import user from "@/js/user";
import {store} from "@/store";

export default {
  data() {
    return {
      visible: false,
      username: '',
      password: '',
      wrongPasswordOrUsername: false,
      loginLoading: false,
    };
  },
  methods: {
    login() {
      this.loginLoading = true
      user.login(this.username, this.password, (res) => {
        this.loginLoading = false
          user.getUser((userdata) => {
            store.state.user.data = userdata.data
          });
          store.state.user.status = true
          this.$router.push({ path: '/', query: {id: store.state.user.data.id}});
      }, error => {
        this.loginLoading = false
        console.log(error)
        this.wrongPasswordOrUsername = true
      });
    },
    goToRegister() {
      this.$router.push('/register'); // Navigate to the registration page
    },
  },
};
</script>

<style scoped>
.login_box {
  width: 500px;
  height: 540px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.home {
  width: 100%;
  min-height: 100vh;
  background: url("public/bg.svg") center center no-repeat;
  background-size: cover;
  overflow: auto;
}
</style>
