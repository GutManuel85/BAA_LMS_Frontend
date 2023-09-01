<template>
  <h2 class="title is-2">Start</h2>
  <h3 class="title is-3">Kursbeschreibung</h3>
  <div v-html="courseLongDescriptionFormatted"></div>
  <hr>
  <div :key="startKey">
    <h3 class="title is-3">Einschreibung</h3>
    <div v-if="!isAlreadyEnrolled && !isAlreadyDone">
      <p>Über den untenstehenden Button kannst du dich für den Kurs einschreiben. Dadurch erscheint er unter
        <router-link to="/personal-area/my-account"><span class="is-underlined">deinem Account</span></router-link>
        auf dem Kurs-Board in der Spalte "In Progress".
      </p>
      <button class="button is-primary is-size-5 has-icons-right" @click="enrollForCourse" :disabled="isClicked">
        <span class="mr-4">Für Kurs einschreiben</span>
        <span class="icon is-small is-right">
      <i class="fa-solid fa-pencil mr-4"></i>    </span>
      </button>
    </div>
    <div v-else-if="isAlreadyDone">
      <p>Du hast den Kurs bereits absolviert, doch repetieren schadet nie! Schreib dich einfach erneut über den
        Button unten für den Kurs ein.
      </p>
      <button class="button is-primary is-size-5 has-icons-right" @click="enrollForCourse" :disabled="isClicked">
        <span class="mr-4">Kurs repetieren</span>
        <span class="icon is-small is-right">
      <i class="fa-solid fa-repeat mr-4"></i>    </span>
      </button>
    </div>
    <div v-else>
      <button class="button is-primary is-size-5 has-icons-right" :disabled="true">
        <span class="mr-4">Bereits eingeschrieben</span>
        <span class="icon is-small is-right">
      <i class="fa-solid fa-check-circle mr-4"></i>    </span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StartCourseComponent",
  props: {
    course: Object,
    courseLongDescriptionFormatted: String,
  },
  data() {
    return {
      userProfile: null,
      courseId: null,
      isAlreadyEnrolled: false,
      isAlreadyDone: false,
      isClicked: false,
      startKey: 0,
    }
  },
  mounted() {
    axios.get('/api/v1/courses/user-profile/')
        .then(response => {
          console.log("mounted")
          this.userProfile = response.data;
              console.log(this.userProfile);
              this.courseId = parseInt(this.$route.params.slug.split('-')[0]);
              this.isAlreadyEnrolledCheck();
              this.isAlreadyDoneCheck();
              console.log(this.isClicked);
              console.log(this.isAlreadyEnrolled);
              console.log(this.isAlreadyDone);
            }
        )
  },
  methods: {
    isAlreadyEnrolledCheck() {
      console.log("isAlreadyEnrolledCheck")
      console.log(this.userProfile)
      const enrolledIds = []
      for (let course of this.userProfile.courses_enrolled) {
        enrolledIds.push(course.id);
      }
      console.log(enrolledIds)
      console.log(this.courseId)
      console.log(enrolledIds.includes(this.courseId))
      this.isAlreadyEnrolled = enrolledIds.includes(this.courseId);
      console.log(this.isAlreadyEnrolled)
    },
    isAlreadyDoneCheck() {
      console.log("isAlreadyDoneCheck")
      console.log(this.userProfile)
      const doneIds = []
      for (let course of this.userProfile.courses_done) {
        doneIds.push(course.id);
      }
      console.log(doneIds)
      this.isAlreadyDone = doneIds.includes(this.courseId);
      console.log(this.isAlreadyDone)
    },
    enrollForCourse() {
      axios
          .post(`api/v1/courses/set-enrolled/${this.course.id}/`)
          .then(response => {
            console.log(response.data);
            this.isClicked = true;
            this.forceRerender();
          })
          .catch(error => {
            console.log(error);
          });
    },
    forceRerender() {
      this.startKey++;
      console.log("forceRerender clicked")
    },
  }
}
</script>

<style scoped>

</style>