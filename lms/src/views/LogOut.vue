<template>
  <div class="logout">
    <title-area :title="'Log out'"></title-area>
    <section class="section">
      <MessageBox :color="'warning'">
        <div class="has-text-centered">
          <p>Denke daran, dass Wissen kontinuierlich gefestigt werden muss. Wir freuen uns, dich bald wieder zu
            sehen!</p>
          <br>
          <button @click="logout()" class="button is-primary">Log out</button>
        </div>
      </MessageBox>
    </section>
  </div>
</template>

<script>
import TitleArea from "@/components/TitleArea";
import axios from "axios";
import MessageBox from "@/components/MessageBox";

export default {
  name: "LogOut.vue",
  components: {MessageBox, TitleArea},
  methods: {
    logout() {
      console.log('Logging out');
      axios.defaults.headers.common['Authorization'] = "";
      localStorage.removeItem('token');
      this.$store.commit('removeToken');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>