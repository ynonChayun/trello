<template>
    <Draggable v-if="task">
        <div class="task-preview-container">
            <div class="task-preview">
                <p class="task-title">{{ task.title }} </p>
                <button @click.native="removeTask">X</button>
            </div>
        </div>
    </Draggable>
</template>

<script>
import { Draggable } from 'vue3-smooth-dnd'
export default {
    name: "KanbanItem",
    components: { Draggable },
    data() {
        return {
        }
    },
    props: {
        task: Object,
        boardId: String,
        groupId: String,
    },
    methods: {
        removeTask() {
            const id = this.task.id
            this.$emit('removeTask', id)
        }
    }
};
</script>