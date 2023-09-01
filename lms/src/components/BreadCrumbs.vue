<template>
  <section class="section">
    <div class="container">
      <nav class="breadcrumb is-info" aria-label="breadcrumbs">
        <ul>
          <template
              v-for="crumb in crumbs"
              v-bind:key="crumb.id"
          >
            <li>
              <router-link :to="crumb.slug"><span class="breadcrumb_text">{{ crumb.text }}</span></router-link>
            </li>
          </template>
          <li v-if="is_logged_in">
            <router-link to="" aria-current="page"><span class="breadcrumb_text">{{ last_crumb_text }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  name: "BreadCrumbs",
  props: {
    crumbs: {
      type: Array,
      optional: false
    },
    last_crumb_text: {
      type: String,
      optional: false
    },
    is_logged_in: {
      type: Boolean,
      optional: true,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../my_styles.scss";

section {
  padding-top: 2% !important;
  padding-bottom: 1px !important;
}

.breadcrumb_text {
  color: hsl(0, 0%, 71%);;
}

</style>