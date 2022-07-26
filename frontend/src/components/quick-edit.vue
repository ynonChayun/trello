<template>
  <section class="quick-card-editor">
    <div class="quick-edit">
      <div class="card-editor">
        <div class="card-details">
          <form @submit.prevent="saveTask">
            <textarea v-model="task.title"></textarea>
          </form>
        </div>
        <button @click="saveTask">Save</button>
      </div>
      <div class="quick-card-editor-buttons">
        <button>Open card</button>
        <button>Edit labels</button>
        <button>Change members</button>
        <button>Change cover</button>
        <button>Move</button>
        <button>Copy</button>
        <button>Edit dates</button>
        <button>Archive</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    task: Object,
  },

  methods: {
    saveTask() {
      const task = JSON.parse(JSON.stringify(this.task))
      this.$emit('taskEdited', task)
    },
  },
}
</script>
