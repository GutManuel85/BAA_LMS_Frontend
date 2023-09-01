<template>
  <div class="card">
    <router-link v-bind:to="{name: 'Course', params: {slug: course.slug}}">
      <div class="card-image">
        <figure class="image is-4by3">
          <img v-bind:src="course.get_image" alt="Picture">
        </figure>
      </div>

      <div class="card-content">
        <div class="media">
          <div id="card-title" class="media-content">
            <p class="card-text is-size-5">{{ course.title }}</p>
          </div>
        </div>
        <div class="content">
          <p class="card-text">{{ course.short_description }}</p>
          <slot></slot>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: Object
  }
}
</script>

<style scoped lang="scss">
@import "../../my_styles.scss";

#card-title {
  min-height: 60px;
}

.courses_content{
  height: 800px;
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