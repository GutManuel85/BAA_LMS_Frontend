<template>
  <div class="ranking">
    <title-area :title="'Rangliste'"></title-area>
    <bread-crumbs
        :crumbs="[{slug:'/', text: 'Home'}]"
        :last_crumb_text="'Rangliste'"
    ></bread-crumbs>
    <section class="section">
        <div class="">
          <table class="table has-text-left is-fullwidth" aria-label="Ranking_Tabelle">
            <thead>
            <tr>
              <th id="picture"></th>
              <th id="rank">Rang</th>
              <th>Punkte</th>
              <th>Benutzername</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="element in ranking" v-bind:key="element">
              <td>
                <div class="column is-hidden-mobile">
                  <figure v-if="element.rank == 1" class="image is-48x48">
                    <img :src="require('@/assets/pictures/gold.png')" alt="gif_Ranking">
                  </figure>
                  <figure v-if="element.rank == 2" class="image is-48x48">
                    <img  :src="require('@/assets/pictures/silver.png')" alt="gif_Ranking">
                  </figure>
                  <figure v-if="element.rank == 3" class="image is-48x48">
                    <img :src="require('@/assets/pictures/bronze.png')" alt="gif_Ranking">
                  </figure>
                </div>
              </td>
              <td>
                <div class="title is-4">{{ element.rank }}</div>
              </td>
              <td>
                <div class="title is-4">{{ element.points }}</div>
              </td>
              <td>
                <div class="title is-4">{{ element.username }}</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
    </section>
  </div>
</template>

<script>
import TitleArea from "@/components/TitleArea";
import axios from "axios";
import BreadCrumbs from "@/components/BreadCrumbs";

export default {
  name: "RankingView",
  components: {BreadCrumbs, TitleArea},
  mounted() {
    axios.get('/api/v1/courses/ranking/')
        .then(response => {
          console.log(response)
          this.ranking = response.data;
        })
        .catch(error => {
          console.log(error);
        });
  },
  data() {
    return {
      ranking: []
    }
  }
}
</script>

<style scoped>

#rank {
  width: 5%;
}

#picture {
  width: 5%;
}

</style>