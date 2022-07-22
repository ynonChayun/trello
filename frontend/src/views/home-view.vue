<template>
  <section class="home-view">
    <div class="hero">
      <div class="hero-sign-up">
        <h1>Trello helps teams move work forward.</h1>
        <p>
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is
          unique—accomplish it all with Trello.
        </p>
        <button @click="this.$router.push('/board')">Get started</button>
      </div>
      <div class="hero-img">
        <img src="../imgs/hero.webp" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },
}
</script>

<style>
.home-page h1 {
  text-align: center;
}
</style>
