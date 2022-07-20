<template>
    <div>
        <editableTitle @input="saveGroup" v-model="group.title" :title="group.title"></editableTitle>

        <Container orientation="vertical" group-name="col-items"
            :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
            :get-child-payload="getCardPayload(group.id)" @drop="onCardDrop(group, $event)">

            <task-preview @click.native="goToEdit(task.id)" v-for="task in group.tasks" :boardId="board._id"
                :groupId="group.id" :task="task" :key="task.id" />

        </Container>
    </div>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from '../service/helpers.js'
import taskPreview from '../components/task-preview.vue'
import editableTitle from '../components/editable-title.vue'


export default {
    props: {
        board: Object,
        group: Object,
        boardId: String,
        idx: Number,
    },
    components: {
        Container,
        taskPreview,
        editableTitle
    },
    methods: {
        goToEdit(taskId) {
            this.$router.push(`/board/${this.boardId}/${this.group.id}/${taskId}`)
            console.log('groupId: ')
        },
        getCardPayload(groupId) {
            return (index) => {
                return this.board.groups.filter((p) => p.id === groupId)[0].tasks[index]
            }
        },
        async onCardDrop(currGroup, dropResult) {
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                const board = Object.assign({}, this.board)
                const group = currGroup
                const itemIndex = board.groups.indexOf(group)
                const newColumn = Object.assign({}, group)

                newColumn.tasks = await applyDrag(newColumn.tasks, dropResult)
                board.groups.splice(itemIndex, 1, newColumn)
                // this.board = board 

                // TODO: EMIT TO PARENT - UPDATE BOARD
                // this.$emit('saveBoard', board)
            }
        },
        async saveGroup(bla) {
            console.log('group: ' , bla)
            // await this.$store.dispatch({ type: "saveGroup", group });
        },
    }

}
</script>

<style lang="scss" scoped>
</style>