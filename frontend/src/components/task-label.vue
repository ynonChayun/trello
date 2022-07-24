<template>
  <section v-if="taskLabels" class="task-labels-preview">
    <h4 class="task-info-headline">Labels</h4>
    <div>
      <ul class="clean-list flex task-label">
        <li
          v-for="label in taskLabels"
          :key="label.id"
          :style="{ 'background-color': label.color }"
          class="label-color"
          @click="openLabelPopup"
        >
          {{ label.title }}
        </li>
        <li class="icon plus label-color" @click="openLabelPopup"></li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    taskLabelIds: Array,
  },
  methods: {
    openLabelPopup(ev) {
      this.$emit("open-label-popup", ev);
    },
  },
  computed: {
    boardLabels() {
      return this.$store.getters.currBoard.labels;
    },
    taskLabels() {
      if (!this.taskLabelIds) return;
      const labels = this.boardLabels.filter((label) =>
        this.taskLabelIds.includes(label.id)
      );
      return labels;
    },
  },
};
</script>
