<template>
  <a
    class="board-preview"
    :href="`/board/${board._id}`"
    :style="{ backgroundImage: `url(${board.imgUrl})` }"
  >
    <h3 class="board-title">{{ board.title }}</h3>
  </a>
</template>

<script>
export default {
  props: {
    board: Object,
  },
}
</script>
