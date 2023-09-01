<template>
  <div class="myAccount">
    <title-area v-if="!$store.state.user.isAuthenticated" v-bind:title="'Mein Account'"></title-area>
    <title-area v-else v-bind:title="`Der Account von ${username}`"></title-area>
    <bread-crumbs
        :crumbs="[{slug:'/', text: 'Home'}]"
        :last_crumb_text="'Mein Account'"
    ></bread-crumbs>
  </div>
  <section class="section">
    <div class="container">

      <div class="columns content">
        <div class="column is-2">
          <template v-if="$store.state.user.isAuthenticated">
            <aside class="menu">
              <h4 class="menu-label">Gehe zu</h4>
              <div class="menu-list">
                <div v-for="element in dashboards" v-bind:key="element">
                  <a :href="'#' + element.sectionId"
                     v-on:click="scrollToSection(element.sectionId)">{{ element.title }}</a>
                </div>
              </div>
            </aside>
          </template>
        </div>
        <div class="column is-10 dashboard_content">
          <template v-if="$store.state.user.isAuthenticated">
            <section class="mt-2" :id="this.dashboards[0].sectionId">
              <h4 class="title is-4 has-text-primary">{{ this.dashboards[0].title }}</h4>
              <div id="app" class="container">

                <div class="columns">
                  <dashboard-box
                      :title-first-line="'Meine'"
                      :title-second-line="'Punktzahl:'"
                      :content="this.points.toString()">
                  </dashboard-box>
                  <dashboard-box
                      :title-first-line="'Eingeschriebene'"
                      :title-second-line="'Kurse:'"
                      :content="this.coursesEnrolled.length.toString()">
                  </dashboard-box>
                  <dashboard-box
                      :title-first-line="'Abgeschlossene'"
                      :title-second-line="'Kurse:'"
                      :content="this.coursesDone.length.toString()">
                  </dashboard-box>
                  <dashboard-box
                      :title-first-line="'Erstellte'"
                      :title-second-line="'Kurse:'"
                      :content="this.myCourses.length.toString()">
                  </dashboard-box>
                  <br>
                </div>
              </div>
            </section>

            <hr>
            <section class="mt-2" :id="this.dashboards[1].sectionId">
              <h4 class="title is-4 has-text-primary">{{ this.dashboards[1].title }}</h4>

              <div class="columns">
                <div class="column mx-2 px-2 py-3 has-background-white-ter border rounded">
                  <h6 class="title is-6 has-text-primary">Open <i class="fa-solid fa-book is-primary"></i></h6>
                  <template v-for="course in coursesOpen" :key="course">
                    <board-course-box :course="course"></board-course-box>
                  </template>

                </div>
                <div class="column mx-2 px-2 py-3 has-background-white-ter border rounded">
                  <h6 class="title is-6 has-text-primary">In Progress <i class="fa-solid fa-pencil is-primary"></i></h6>
                  <template v-for="course in coursesEnrolled" :key="course">
                    <board-course-box :course="course"></board-course-box>
                  </template>
                </div>
                <div class="column mx-2 px-2 py-3 has-background-white-ter border rounded">
                  <h6 class="title is-6 has-text-primary">Done <i class="fa-solid fa-calendar-check"></i></h6>
                  <template v-for="course in coursesDone" :key="course">
                    <board-course-box :course="course"></board-course-box>
                  </template>
                </div>
              </div>
            </section>


            <hr>

            <section class="mt-2" :id="this.dashboards[2].sectionId">
              <h4 class="title is-4 has-text-primary">{{ this.dashboards[2].title }}</h4>
              <div v-if="this.myCourses.length < 1">
                <a v-bind:href="`${url}/admin/`" target="_blank">
                  Du hast noch keine Kurse erstellt. Hier kannst du eigene <span class="is-underlined">Kurse erstellen</span>.
                </a>
              </div>
              <div v-else class="columns is-multiline courses_content">

                <div
                    class="column is-4"
                    v-for="course in myCourses"
                    v-bind:key="course.id"
                >
                  <div class="card">
                    <course-card :course="course">
                    </course-card>
                  </div>
                </div>
              </div>

            </section>
          </template>
          <template v-else>
            <restricted-access></restricted-access>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TitleArea from "@/components/TitleArea";
import DashboardBox from "@/components/DashboardBox";
import axios from "axios";
import CourseCard from "@/components/CourseCard";
import RestrictedAccess from "@/components/RestrictedAccess";
import BreadCrumbs from "@/components/BreadCrumbs";
import BoardCourseBox from "@/components/BoardCourseBox";
import * as globals from "@/variables/global_variables"


export default {
  name: "MyAccount",
  components: {
    BoardCourseBox,
    BreadCrumbs, RestrictedAccess, DashboardBox, TitleArea, CourseCard
  },

  mounted() {
    const getCoursesPromise = axios.get('api/v1/courses/');
    const getMyCoursesPromise = axios.get('api/v1/courses/my-courses/');
    const getUserProfilePromise = axios.get('/api/v1/courses/user-profile/');

    Promise.all([getCoursesPromise, getMyCoursesPromise, getUserProfilePromise])
        .then(([coursesResponse, myCoursesResponse, userProfileResponse]) => {
          this.allCourses = coursesResponse.data;
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

          this.myCourses = myCoursesResponse.data;
          this.points = userProfileResponse.data.points;
          this.username = userProfileResponse.data.username;
          this.coursesEnrolled = userProfileResponse.data.courses_enrolled;
          this.coursesDone = userProfileResponse.data.courses_done;
          this.coursesOpen = this.filterOpenCourses();
        })
        .catch(error => {
          console.log(error);
        });
  },
  data() {
    return {
      dashboards: [
        {title: "Übersicht", sectionId: "overview"},
        {title: "Kurs-Board", sectionId: "courseBoard"},
        {title: "Meine Kurse", sectionId: "my_courses"}
      ],
      myCourses: [],
      allCourses: [],
      coursesOpen: [],
      coursesEnrolled: [],
      coursesDone: [],
      username: '',
      points: 0,
      url: globals.url_host_django,
    }
  },
  computed: {
    calculateHeight() {
      return '800 px'
    }
  },
  methods: {
    scrollToSection(sectionId) {
      document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
    },
    filterOpenCourses() {
      const enrolledIds = []
      for(let course of this.coursesEnrolled){
        enrolledIds.push(course.id)
      }
      const doneIds = []
      for(let course of this.coursesDone){
        doneIds.push(course.id)
      }

      return this.allCourses.filter(course => {
        return !enrolledIds.includes(course.id) && !doneIds.includes(course.id);
      });
    }
  }
}


</script>

<style scoped>
.dashboard_content {
  height: 90vh;
  overflow-y: scroll
}

h6 {
  font-weight: 700;
}

.draggable-list > div {
  cursor: pointer;
}

</style>