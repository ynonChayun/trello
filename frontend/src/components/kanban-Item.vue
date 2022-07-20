<template>
    <Draggable v-if="task">
        <div
            class="cursor-move my-2 mx-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 hover:border-2 border-primary">
                <p>{{ task.title }}</p>
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
    },
};
</script>