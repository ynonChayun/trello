<template>
  <section v-if="taskLabels" :class="{ 'task-labels-preview': isInTask}">
    <h4 class="task-info-headline" v-if="isInTask">Labels</h4>
    <div>
      <ul class="clean-list flex flex-wrap task-label">
        <li v-for="label in taskLabels" :key="label.id" :style="{ 'background-color': label.color }"
          :class="{ 'label-color': isInTask }" @click="togglePopup">
          {{ label.title }}
        </li>
        <div class="add-labels-btn" v-if="isInTask">
          <img @click="togglePopup" class="plus-svg" src="../svgs/plus.svg" alt="">
          <popup-label v-if="isLabelOpen" @set-task-labels="setTaskLabels" @toggle-popup="togglePopup" :task="task">
          </popup-label>
        </div>
      </ul>
    </div>
  </section>
</template>

<script>
import popupLabel from './popup-label.vue';
export default {
  props: {
    taskLabelIds: Array,
    task: Object,
    isInTask: Boolean
  },
  components: {
    popupLabel
  },
  data() {
    return {
      isLabelOpen: false,
    };
  },
  methods: {
    togglePopup() {
      this.isLabelOpen = !this.isLabelOpen
    },
    setTaskLabels({ labelIds }) {
      this.task.labelIds = labelIds;
      const task = JSON.parse(JSON.stringify(this.task))
      console.log('task: ', task)
      this.saveTask(task);
    },
    async saveTask(task) {
      await this.$store.dispatch({ type: "saveTask", task });
    },
  },
  computed: {
    boardLabels() {
      return this.$store.getters.currBoard.labels
    },
    taskLabels() {
      if (!this.taskLabelIds) return
      const labels = this.boardLabels.filter((label) =>
        this.taskLabelIds.includes(label.id)
      );
      return labels;
    },

  },
};
</script>
