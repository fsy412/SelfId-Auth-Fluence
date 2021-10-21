<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="width: 100%">
    <ul class="navbar-nav">
      <router-link tag="li" class="nav-link" to="/" exact>
        <a>Service</a>
      </router-link>
      <router-link tag="li" class="nav-link" to="/admin" exact>
        <a>Permission</a>
      </router-link>
    </ul>
    <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
      <li class="nav-item">
        <span class="nav-link disabled" style="margin: 0px 20px"> {{ did }}</span>
      </li>
      <li class="nav-item"></li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    did() {
      return this.$store.getters.getDid
    },
  },
  created() {},
}
</script>

<style scoped>
.account {
  float: right;
  margin-left: 15em;
}
</style>
