<template>
  <div class="home">
    <title-area :title="'Willkommen bei WeSmart'" :subtitle="'So macht lernen Spass!'"
                :has-subtitle="true"></title-area>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">

          <div class="column is-4">
            <router-link to="/courses">
              <div class="box has-text-centered linked">
                <span class="icon is-size-2 has-text-primary"><i class="fa-solid fa-graduation-cap"></i></span>
                <h2 class="is-size-4 mt-4 mb-4 linked-text">Zu allen Kursen</h2>
                <p class="linked-text">Verschaff dir einen Überblick!</p>
              </div>
            </router-link>
          </div>

          <div class="column is-4">
            <router-link to="/new-courses">
              <div class="box has-text-centered linked">
                <span class="icon is-size-2 has-text-primary"><i class="fa-solid fa-fire"></i></span>
                <h2 class="is-size-4 mt-4 mb-4 linked-text">Entdecke neue Kurse</h2>
                <p class="linked-text">Schau hier, was es neues gibt!</p>
              </div>
            </router-link>
          </div>

          <div class="column is-4">
            <!-- Todo: Change href to global variable -->
            <a v-bind:href="`${url}/admin/`" target="_blank">
              <div class="box has-text-centered linked">
                <span class="icon is-size-2 has-text-primary"><i class="fa-solid fa-compass-drafting"></i></span>
                <h2 class="is-size-4 mt-4 mb-4 linked-text">Erstelle eigene Kurse</h2>
                <p class="linked-text">Erstelle neue Kurse und teile sie!</p>
              </div>
            </a>
          </div>

          <div class="column is-4">
            <router-link to="/personal-area/my-account">
              <div class="box has-text-centered linked">
                <span class="icon is-size-2 has-text-primary"><i class="fa-solid fa-chart-line"></i></span>
                <h2 class="is-size-4 mt-4 mb-4 linked-text">Mein Account</h2>
                <p class="linked-text">Alle deine Aktivitäten auf einen Blick!</p>
              </div>
            </router-link>
          </div>

          <div class="column is-4">
            <router-link to="/ranking">
              <div class="box has-text-centered linked">
                <span class="icon is-size-2 has-text-primary"><i class="fa-solid fa-ranking-star"></i></span>
                <h2 class="is-size-4 mt-4 mb-4 linked-text">Rangliste</h2>
                <p class="linked-text">Schau hier, wer noch vor dir liegt!</p>
              </div>
            </router-link>
          </div>

          <div class="column is-4">
            <router-link to="/">
              <div class="box has-text-centered linked">
                <span class="icon is-size-2 has-text-primary"><i class="fa-solid fa-school-flag"></i></span>
                <h2 class="is-size-4 mt-4 mb-4 linked-text">Tutorial</h2>
                <p class="linked-text">WeSmart lernst du kinderleicht!</p>
              </div>
            </router-link>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TitleArea from "@/components/TitleArea";
import * as globals from "@/variables/global_variables"

export default {
  name: 'HomeView',
  components: {TitleArea},
  data(){
    return{
      url: globals.url_host_django,
    }
  }
}
</script>


<style scoped lang="scss">
@import "../../my_styles.scss";

.linked:hover {
  background-color: $light;

  .linked-text {
    color: $primary;
  }
}


</style>
