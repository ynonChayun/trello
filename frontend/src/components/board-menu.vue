<template>
  <section class="board-menu" :class="menuOpen">
    <div class="header">
      <button @click="backToMainMenu" class="back-button">
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>
      <h3>{{ title }}</h3>
      <button @click="$emit('close-menu')" class="close-button">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
    </div>
    <hr />
    <div v-if="changeBackgroundMenu" class="change-background">
      <div
        v-for="color in colors"
        :key="color"
        class="background-option-container"
      >
        <div
          @click="$emit('background-change', { color })"
          class="background-option"
          :style="{ backgroundColor: color }"
        ></div>
      </div>
      <div
        v-for="cover in covers"
        :key="cover"
        class="background-option-container"
      >
        <div
          @click="$emit('background-change', { cover })"
          class="background-option"
          :style="{ backgroundImage: `url(${cover})` }"
        ></div>
      </div>
    </div>
    <div v-else class="board-menu-content">
      <ul>
        <li @click="changeBackgroundMenu = true">
          <div class="icon" :style="iconBackground"></div>
          <p>Change background</p>
        </li>
        <li>
          <div class="icon">
            <img src="../svgs/archive.svg" />
          </div>
          <p>Archived items</p>
        </li>
      </ul>
      <hr />
      <div class="activity-list">
        <div class="activity-header">
          <i></i>
          <p>Activity</p>
        </div>
        <div
          class="activity"
          v-for="activity in board.activities"
          :key="activity.id"
        >
          <span class="avatar">
            <img :src="activity.byMember.imgUrl" />
          </span>
          <div class="activity-info">
            <span class="member-name">{{ activity.byMember.fullname }}</span>
            <span>{{ activity.txt }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    board: Object,
    isMenuOpen: Boolean,
  },

  data() {
    return {
      changeBackgroundMenu: false,
      archivedMenu: false,
      colors: [
        'rgb(0, 121, 191)',
        'rgb(210, 144, 52)',
        'rgb(81, 152, 57)',
        'rgb(176, 70, 50)',
        'rgb(137, 96, 158)',
        'rgb(205, 90, 145)',
        'rgb(75, 191, 107)',
        'rgb(0, 174, 204)',
        'rgb(131, 140, 145)',
      ],
      covers: [
        'https://images.unsplash.com/photo-1546830152-f6cc0b95b7b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1972&q=80',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      ],
    }
  },

  methods: {
    backToMainMenu() {
      this.changeBackgroundMenu = false
      this.archivedMenu = false
    },
  },

  computed: {
    title() {
      if (this.changeBackgroundMenu) return 'Change background'
      else if (this.archivedMenu) return 'Archived Items'
      else return 'Menu'
    },
    iconBackground() {
      return this.board.style.bgCover
        ? { backgroundImage: `url(${this.board.style.bgCover})` }
        : { backgroundColor: this.board.style.bgColor }
    },
    menuOpen() {
      return {
        'menu-open': this.isMenuOpen,
      }
    },
    // computed: {
    //   toggleMenu() {
    //     return this.isMenuOpen ? 'X' : '☰'
    //   },
    // },
  },
}
</script>
