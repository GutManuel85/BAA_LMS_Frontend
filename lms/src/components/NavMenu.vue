<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item is-size-4" to="/">
        <img class="ml-2" src="./../assets/pictures/logo.png" alt="logo">
        <div class="ml-2">WeSmart</div>
      </router-link>

      <a role="button" :class="`navbar-burger ${isActiveString}`" aria-label="menu"
         aria-expanded="false" data-target="navbarBasicExample" @click="toggleIsActive()">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="`navbar-menu ${isActiveString}`">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/courses">Alle Kurse</router-link>
        <router-link class="navbar-item" to="/new-courses">Neue Kurse</router-link>
        <a  class="navbar-item" v-bind:href="`${url}/admin/`" target="_blank">Kurs erstellen</a>
        <router-link class="navbar-item" to="/ranking">Rangliste</router-link>
        <router-link class="navbar-item" to="/about">Kontakt</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <template v-if="!$store.state.user.isAuthenticated">
            <router-link to="/signup"><a class="button is-light mr-1">
              <strong class="has-text-primary">Account erstellen</strong></a></router-link>
            <router-link to="/login"><a class="button is-light mr-1">
              <strong class="has-text-primary">Log in</strong></a></router-link>
          </template>
          <template v-if="$store.state.user.isAuthenticated">
            <router-link to="/personal-area/my-account"><a class="button is-light mr-1">
              <strong class="has-text-primary">Mein Account</strong></a>
            </router-link>
            <router-link to="/logout"><a class="button is-light mr-1">
              <strong class="has-text-primary">Log out</strong></a>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

import * as globals from "@/variables/global_variables";

export default {
  name: "NavMenu",
  data() {
    return {
      url: globals.url_host_django,
      isActive: false,
      isActiveString: ""
    }
  }, methods: {
    toggleIsActive() {
      this.isActive = !this.isActive;
      if(this.isActive) {
        this.isActiveString = 'is-active';
      }else{
        this.isActiveString = "";
      }
    }
  }
}
</script>