<template>
  <div>
    <!-- Trigger Button -->
    <v-btn @click="dialog = true" :block="true" color="blue">Change password</v-btn>

    <!-- Password Change Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>Change password</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="currentPassword"
              :rules="[rules.required]"
              label="Current Password"
              :error="wrongPassword"
              :error-messages="wrongPassword ? 'Wrong password' : ''"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="newPassword"
              :rules="[rules.required, rules.counter, rules.counterMax]"
              label="New Password"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :rules="[rules.required, rules.matchPassword, rules.counter]"
              label="Repeat Password"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="handleChangePassword" :disabled="!valid">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import user from "@/js/user";
import {store} from "@/store";
import SnackBar from "@/js/SnackBar";

export default {
  data() {
    return {
      dialog: false,
      valid: true,
      wrongPassword: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      rules: {
        counter: value => value.length >= 8 || 'Min 8 characters',
        required: value => !!value || 'Required',
        matchPassword: value => value === this.newPassword || 'Passwords do not match',
        counterMax: value => value.length <=128 || 'Max 128 characters',
      }
    };
  },
  methods: {
    handleChangePassword() {
      if (this.$refs.form.validate()) {
        user.login(store.state.user.data.username, this.currentPassword, (res) => {
          user.updateUserPassword(this.newPassword, (res) => {
            SnackBar.Launch("Password changed successfully!");
            user.getUser((res) => {
              store.state.user.data = res.data
            })
            this.dialog = false;
            this.currentPassword = ""
            this.newPassword = ""
            this.confirmPassword = ""
          });
        }, (err) => {
          this.wrongPassword = true
          SnackBar.Launch(err.response.data.message);
        });
      }
    }
  },
  watch: {
    currentPassword() {
      this.wrongPassword = false
    }
  }
};
</script>
