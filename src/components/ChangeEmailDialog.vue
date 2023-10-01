<template>
  <div>
    <!-- Trigger Button -->
    <v-btn @click="dialog = true" :block="true" color="blue">Change email</v-btn>

    <!-- Email Change Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>Change email</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="newEmail"
              :rules="[rules.required, rules.email]"
              label="New Email Address"
              type="email"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="handleChangeEmail" :disabled="!valid">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import user from "@/js/user";
import SnackBar from "@/js/SnackBar";
import {store} from "@/store";

export default {
  data() {
    return {
      dialog: false,
      valid: true,
      newEmail: "",
      rules: {
        required: value => !!value || 'required',
        email: value => /.+@.+\..+/.test(value) || 'please enter a valid email address'
      }
    };
  },
  created() {
    this.newEmail = store.state.user.data.email
  },
  methods: {
    handleChangeEmail() {
      if (this.$refs.form.validate()) {
        user.updateUserEmail(this.newEmail, (res) => {
          SnackBar.Launch("Email changed successfully!");
          user.getUser((res) => {
            store.state.user.data = res.data
          })
          this.dialog = false;
          this.newEmail = "";
        });
      }
    }
  }
};
</script>
