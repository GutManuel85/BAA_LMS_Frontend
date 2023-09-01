<template>
  <div class="login">

    <title-area :title="'Log in'"></title-area>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <div class="has-text-left">
              <div class="field">
                <label>Email</label>
                <div class="control has-icons-left">
                  <input type="email" class="input" v-model="username">
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <label>Passwort</label>
                <password-field @update-parent-password="updatePassword"></password-field>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button is-dark" @click="submitForm()">Log in</button>
                </div>
              </div>

              <div class="notification is-danger" v-if="errors.length">
                <div v-for="(error, index) in errors" :key="error">
                  {{ error }}
                  <hr v-if="index !== errors.length - 1">
                </div>
              </div>

              <hr>
              <div>
                Falls du noch keinen Account hast,
                <router-link to="/signup"><span class="is-underlined">hier</span></router-link> klicken.
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
import axios from "axios";
import TitleArea from "@/components/TitleArea";
import PasswordField from "@/components/PasswordField";

export default {
  name: "LogInView",
  components: {PasswordField, TitleArea},
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },

  methods: {
    updatePassword(password) {
      this.password = password;
    },
    submitForm() {
      console.log("Form submitted");

      axios.defaults.headers.common['Authorization'] = "";

      localStorage.removeItem('token')

      this.errors = [];

      if (this.username === '') {
        this.errors.push('Der Benutzername fehlt - bitte Email-Adresse angeben.')
      }

      if (this.password === '') {
        this.errors.push('Das Passwort fehlt - bitte eingeben.')
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password
        }

        //this.$router.push('/login')

        axios.post('api/v1/token/login', formData)
            .then(response => {

              const token = response.data.auth_token;

              this.$store.commit('setToken', token);

              axios.defaults.headers.common['Authorization'] = "Token " + token;

              localStorage.setItem('token', token);

              let route = localStorage.getItem('currentRoute');

              if(route != null && route != '') {
                this.$router.push(route);
              }else {
                this.$router.push('/');
              }
              localStorage.setItem('currentRoute', '');
            })
            .catch(error => {
              if (error.response) {
                for (const property in error.response.data) {
                  this.errors.push(`${property}: ${error.response.data[property]}`)
                }
                console.log(JSON.stringify(error.response.data));
              } else if (error.message) {
                this.errors.push("Hat leider nicht geklappt. Versuch's nochmals!");
                console.log(JSON.stringify(error));
              }
            })
      }
    }
  }

}
</script>

<style scoped>

</style>