<template>
  <div class="control has-icons-left is-flex">
    <input :type="passwordFieldType" class="input" @input="updatePassword()" v-model="password">
    <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                  </span>
    <button class=" button is-light my_input" @click="switchVisibility">
      <i v-if="passwordFieldType=='password'" class="fa-solid fa-eye"></i>
      <i v-else class="fa-solid fa-eye-slash"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "PasswordField",
  data() {
    return {
      password: '',
      passwordFieldType: "password",
    }
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    updatePassword() {
      this.$emit('update-parent-password', this.password);
    }
  }
}
</script>

<style scoped>

</style>