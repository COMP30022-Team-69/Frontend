<template>
    <v-card>
      <v-card-title>User Authority</v-card-title>
      <v-card-text>
        <v-btn-toggle
          v-model="authority"
          rounded="3"
          color="deep-purple-accent-3"
          group
        >
          <v-btn value="normal">
            Normal
          </v-btn>

          <v-btn value="admin">
            Admin
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="handleUpload">{{update ? 'Update' : 'Upload'}}</v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
import SnackBar from "@/js/SnackBar";
import user from "@/js/user";

export default {
  data() {
    return {
      authority: '',
    };
  },
  computed: {
    update(){
      return this.usr != null;
    }
  },
  created() {
    this.authority = this.usr.authority
  },
  props: {
    usr: {
      type: Object,
      default: null
    },
  },
  methods: {
    handleUpload() {
      user.updateUserAuthority(this.usr.id, this.authority, ()=>{
        SnackBar.Launch('Authority Update Success')
        this.close()
      })
    },
    close(){
      this.$emit('close')
    }
  },
}
</script>
<style scoped>

</style>
