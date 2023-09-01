<template>
  <div class="box">
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="image is-size-2">
          <img :src="course.get_image" alt="Kursbild">
        </div>
      </div>
      <div class="column">
        <div class="content">
          <p>{{ course.title }}</p>
          <div class="has-icons-right">
            <router-link v-bind:to="`/courses/${course.slug}`">
              <i class="fas fa-link" aria-hidden="true"></i><span class="ml-2">Link</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "BoardCourseBox",
  props: {
    course: Object
  }
}
</script>

<style scoped>
.box{
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}
</style>