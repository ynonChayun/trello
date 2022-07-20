<template>
  <section class="home-page">
    <h1>Home Page</h1>
    <router-link to="/board">go to board list</router-link>
  </section>
</template>

<script>
export default {
  created(){
       this.$store.dispatch({ type: "loadBoards" })
  }
}
</script>

<style>
.home-page h1 {
  text-align: center;
}
</style>
