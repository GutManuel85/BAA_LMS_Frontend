<template>
  <div class="courses">
    <title-area :title="'Unsere Kurse'"></title-area>
    <bread-crumbs
        :crumbs="[{slug:'/', text: 'Home'}]"
        :last_crumb_text="'Alle Kurse'"
    >
    </bread-crumbs>
    <section class="section">
      <div class="container">
        <div class="columns content">
          <div class=" column is-2">
            <aside class="menu">
              <h4 class="menu-label">Kategorien</h4>
              <div class="menu-list">
                <a v-on:click="filterCoursesWithCategory('all categories')">
                  <span v-if="activeCategory == 'all categories'" class="has-text-weight-bold">Alle Kategorien</span>
                  <span v-else>Alle Kategorien</span>
                </a>
                <div v-for="category in categories" v-bind:key="category.id">
                  <a v-on:click="filterCoursesWithCategory(category.title)">
                    <span v-if="activeCategory == category.title" class="has-text-weight-bold">
                      {{ category.title }}
                    </span>
                    <span v-else>{{ category.title }}</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <div class="column is-10">
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="Bitte Kurstitel eingeben" v-on:input="filteredCourses()"
                       v-model="searchTerm">
              </p>
            </div>

            <hr>

            <div class="columns is-multiline courses_content">

              <div
                  class="column is-4"
                  v-for="course in courses"
                  v-bind:key="course.id"
              >
                <course-card :course="course"></course-card>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios';
import TitleArea from "@/components/TitleArea";
import CourseCard from "@/components/CourseCard";
import BreadCrumbs from "@/components/BreadCrumbs";

export default {
  name: "CoursesView.vue",
  components: {BreadCrumbs, CourseCard, TitleArea},
  data() {
    return {
      allCourses: [],
      courses: [],
      allCategories: [],
      categories: [],
      searchTerm: '',
      activeCategory: 'all categories'
    }
  },
  mounted() { //mounted(): lifecycle hook that gets called after the Vue instance has been mounted to the DOM.
    console.log('mounted')

    axios
        .get('api/v1/courses/')
        .then(response => {
          console.log(response.data);
          this.courses = response.data;
          this.allCourses = response.data;
          this.allCourses= this.allCourses.sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA < titleB) {
              return -1; //
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          });
        })

    axios
        .get('api/v1/courses/categories/')
        .then(response => {
          console.log(response.data)
          this.categories = response.data;
          this.allCategories = response.data;
          this.allCategories = this.allCategories.sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            if (titleA < titleB) {
              return -1; //
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          });        })
  },

  methods: {
    filterCoursesWithCategory(categoryTitle) {
      this.courses = this.allCourses;
      this.activeCategory = categoryTitle;
      if (categoryTitle != 'all categories') {
        this.courses = this.courses.filter(course => {
          return course.categories.some(category => category.title === categoryTitle);
        });
      } else {
        this.courses = this.allCourses;
      }
    },
    filteredCourses() {
      this.courses = this.allCourses;
      const searchTerm = this.searchTerm.toLowerCase();
      this.courses = this.courses.filter(course =>
          course.title.toLowerCase().includes(searchTerm)
      );
    }
  }
}

</script>

<style scoped lang="scss">
@import "../../my_styles.scss";

#card-title {
  min-height: 60px;
}

.courses_content {
  height: 90vh;
  overflow-y: scroll
}

.card {
  padding-top: 30px;
}

.card:hover {
  background-color: $primary;

  .card-text {
    color: $primary-invert;
  }
}

</style>