<template>
  <div v-for="cover in covers" :key="cover" class="background-option-container">
    <div
      @click="$emit('background-change', { cover })"
      class="background-option"
      :style="{ backgroundImage: `url(${cover})` }"
    ></div>
  </div>
</template>

<script>
export default {}
</script>
