<template>
  <section class="board-preview">
    <h3>{{ board.title }}</h3>
  </section>
</template>

<script>
export default {
  name: 'board-preview',
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
}
</script>
