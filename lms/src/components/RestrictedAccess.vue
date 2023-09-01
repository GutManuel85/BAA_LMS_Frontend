<template>
  <h2>Zugang nicht erlaubt.</h2>
  <p>Einfach
    <router-link to="/login" @click="saveCurrentRoute"><span class="is-underlined">hier</span></router-link>
    einloggen und los geht's!
  </p>
  <router-link to="/login">
    <img class="gif" :src="require('@/assets/gifs/LogIn.gif')" @click="saveCurrentRoute" alt="gif_LogIn">
  </router-link>
</template>

<script>

import { useRouter} from "vue-router"

export default {
  name: "RestrictedAccess",
  setup() {
    let router = useRouter();
    return {
      router: router,
    }
  },
  methods: {
    saveCurrentRoute(){
      const currentRoute = this.router.currentRoute.value.path
      console.log(currentRoute)
      localStorage.setItem('currentRoute', currentRoute);
      console.log(localStorage.getItem('currentRoute'))
    }
  }
}
</script>

<style scoped>

</style>