<template>
    <!-- <Draggable v-if="task">
    <div>
        {{task}}
    </div>
    </Draggable> -->
    <Draggable v-if="task">
        <div
            class="cursor-move my-2 mx-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 hover:border-2 border-primary">
            <div class="p-4 space-y-2">
                <p>{{ task.title }}</p>
            </div>
        </div>
    </Draggable>

</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
    components: {
        Draggable,
        Container,
    },
    props: {
        task: Object,
    },
}
</script>

<style lang="scss" scoped>
</style>