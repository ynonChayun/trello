vue
<template>
  <section class="app-header">
    <nav class="left-nav">
      <a href="/">Trello</a>
      <button>
        Workspaces
        <span class="material-icons"> keyboard_arrow_down </span>
      </button>
      <button>
        Recent
        <span class="material-icons"> keyboard_arrow_down </span>
      </button>
      <button>
        Starred
        <span class="material-icons"> keyboard_arrow_down </span>
      </button>
      <button>
        Templates
        <span class="material-icons"> keyboard_arrow_down </span>
      </button>
      <button class="create">Create</button>
    </nav>
    <nav class="right-nav">
      <input type="search" placeholder="Search" />
      <button>
        <i class="material-icons">info</i>
      </button>
      <button>
        <i class="material-icons">notifications</i>
      </button>
      <div class="user-avatar">
        <img src="../imgs/amit-profile.jpg" />
      </div>
    </nav>
    <!-- <button @click="isMenuOpen = !isMenuOpen">{{ toggleMenu }}</button> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    }
  },

  computed: {
    toggleMenu() {
      return this.isMenuOpen ? 'X' : '☰'
    },
  },
}
</script>
