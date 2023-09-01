<template>
  <h2 class="title is-2">Herzliche Gratulation</h2>
  <p>Gratulation - Du hast bis am Ende durchgehalten. Über den untenstehenden Button kannst du den Kurs als
    abgeschlossen markieren. Dann erscheint er unter
    <router-link to="/personal-area/my-account"><span class="is-underlined">deinem Account</span></router-link>
    auf dem Kurs-Board in der Spalte "Done". Falls du noch weiter üben möchtest, kannst du das später auch jederzeit
    tun.
  </p>
  <br>
  <div :key="endKey">
    <div v-if="isEnrolled">
      <button class="button is-primary is-size-5 has-icons-right" @click="setCourseToDone">
        <span class="mr-4">Kurs abschliessen</span>
        <span class="icon is-small is-right">
          <i class="fa-regular fa-calendar-check mr-4"></i>
        </span>
      </button>
    </div>
    <div v-else>
      <button class="button is-primary is-size-5 has-icons-right" @click="setCourseToDone" :disabled="!isEnrolled">
        <span class="mr-4">Kurs abgeschlossen</span>
        <span class="icon is-small is-right">
          <i class="fa-regular fa-calendar-check mr-4"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EndCourseComponent",
  props: {
    course: Object
  },
  data() {
    return {
      userProfile: null,
      isClicked: false,
      isEnrolled: false,
      courseId: null,
      endKey: 0,
    }
  },
  mounted() {
    axios.get('/api/v1/courses/user-profile/')
        .then(response => {
              this.userProfile = response.data;
              console.log(this.userProfile);
              this.courseId = parseInt(this.$route.params.slug.split('-')[0]);
              this.isEnrolledCheck();
              console.log(this.isClicked);
              console.log(this.isEnrolled);
            }
        )
  },
  methods: {
    isEnrolledCheck() {
      console.log(this.userProfile)
      const enrolledIds = []
      for (let course of this.userProfile.courses_enrolled) {
        enrolledIds.push(course.id);
      }
      console.log(enrolledIds)
      console.log(this.courseId)
      console.log(enrolledIds.includes(this.courseId))
      this.isEnrolled = enrolledIds.includes(this.courseId);
    },
    setCourseToDone() {
      axios
          .post(`api/v1/courses/set-done/${this.course.id}/`)
          .then(response => {
            this.isClicked = true;
            this.isEnrolled = false;
            console.log(response.data);
            this.forceRerender();
          })
          .catch(error => {
            console.log(error);
          });
    },
    forceRerender() {
      this.endKey++;
      console.log("forceRerender clicked")
    },
  }

}
</script>

<style scoped>

</style>