<template>
  <div>
    <top-menu></top-menu>
    <div class="p-4">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

import TopMenu from './components/TopMenu.vue'
export default {
  components: { TopMenu },
  name: 'App',
}
</script>

<style>
h1.title {
  margin-bottom: 50px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
