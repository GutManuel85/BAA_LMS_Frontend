<template>
  <div class="new_courses">
    <title-area :title="'Neue Kurse'"></title-area>
    <bread-crumbs
        :crumbs="[{slug:'/', text: 'Home'}]"
        :last_crumb_text="'Neue Kurse'"
    ></bread-crumbs>

    <section class="section">
      <div class="container">

        <p class="course_amount">Wie viele der neusten Kurse sollen angezeigt werden?
          <DropdownMenu
              class="mt-2"
              v-bind:dropdown-items="[1,3,6,15,30]"
              v-bind:initial-value="selectedValue.toString()"
              @valueChanged="onValueChanged"
          ></DropdownMenu>
        </p>


        <hr>

        <div id="courses_content" class="columns is-multiline courses_content">

          <div
              class="column is-4"
              v-for="course in newCourses"
              v-bind:key="course.id"
          >
            <div class="card">
            <course-card :course="course">
              <p class="card-text">Erstellungsdatum: {{ course.created_at }}</p>
            </course-card>
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
import DropdownMenu from "@/components/DropdownMenu";
import CourseCard from "@/components/CourseCard";
import BreadCrumbs from "@/components/BreadCrumbs";

export default {
  name: "NewCoursesView.vue",
  components: {BreadCrumbs, DropdownMenu, TitleArea, CourseCard},
  mounted() { //mounted(): lifecycle hook that gets called after the Vue instance has been mounted to the DOM.
    axios
        .get('api/v1/courses/')
        .then(response => {
          const courses = response.data;
          courses.sort((a, b) => a.created_at - b.created_at);
          this.allCourses = courses.reverse();
          this.sliceCourses();
        })
  },
  data() {
    return {
      allCourses: [],
      newCourses: [],
      selectedValue: 3,
    }
  },
  methods: {
    onValueChanged(value) {
      this.selectedValue = value;
      console.log("Dropdown Menu: " + this.selectedValue);
      this.sliceCourses();
    },
    sliceCourses() {
      this.newCourses = this.allCourses.slice(0, Number(this.selectedValue));
      console.log(this.newCourses);
    }
  },
}

</script>

<style scoped lang="scss">
@import "../../my_styles.scss";

#courses_content{
  height: 90vh;
  overflow-y: scroll
}

.card:hover {

  .card-text {
    color: $primary-invert;
  }
}
</style>