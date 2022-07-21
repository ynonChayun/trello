<template>
    <section class="group">
        <div class="flex flex-center justify-between group-header">
            <editableTitle @input="saveGroup" v-model="group.title" :title="group.title"></editableTitle>
            <button @click="deleteGroup">Delete group</button>
        </div>

        <Container class="tasks-wrapper" orientation="vertical" group-name="col-items"
            :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
            :get-child-payload="getCardPayload(group.id)" @drop="onCardDrop(group.id, $event)">

            <task-preview @removeTask="removeTask" @click.native="goToEdit(task.id)" v-for="task in group.tasks"
                :boardId="board._id" :groupId="group.id" :task="task" :key="task.id" />
        </Container>

        <div class="add-task">
            <button v-if="!isAddNewTask" @click="isAddNewTask = true">
                <span>+</span>
                Add another card
            </button>
            <editable-text v-else v-model="newTask.title" :title="newTask.title" :type="'title'" :elementType="'task'"
                :isEditFirst="true" @close-textarea="isAddNewTask = false" @addTask="addTask" />
        </div>
    </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from '../service/helpers.js'
import taskPreview from '../components/task-preview.vue'
import editableTitle from '../components/editable-title.vue'
import editableText from "../components/editable-text.vue";


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
        editableTitle,
        editableText
    },
    data() {
        return {
            newTask: JSON.parse(JSON.stringify(this.$store.getters.getEmptyTask)),
            isAddNewTask: false,
        }
    },
    methods: {
        async removeTask(taskId) {
            // const board = JSON.parse(JSON.stringify(state.currBoard))
            // const idx = board.groups.findIndex((group) => group.id === groupId)
            // console.log('idx: ', idx)
            // board.groups.splice(idx, 1)
            const updatedGroup = JSON.parse(JSON.stringify(this.group))
            const idx = updatedGroup.tasks.findIndex((task) => task.id === taskId)
            updatedGroup.tasks.splice(idx, 1)
            // await this.$store.dispatch({
            //     type: "removeTask",
            //     taskId,
            //     groupd: this.group.id
            // });
             await this.$store.dispatch({ type: "saveGroup", group: updatedGroup });
        },
        async deleteGroup() {
            const id = this.group.id
            await this.$store.dispatch({
                type: "removeGroup",
                groupId: id,
            });
        },
        async addTask(val) {
            this.newTask.title = val
            if (!this.newTask.title) return;
            await this.$store.dispatch({
                type: "saveTask",
                groupId: this.group.id,
                task: this.newTask,
            });
            this.newTask = JSON.parse(
                JSON.stringify(this.$store.getters.getEmptyTask)
            );
            this.isAddNewTask = false;
        },
        goToEdit(taskId) {
            this.$router.push(`/board/${this.boardId}/${this.group.id}/${taskId}`)
        },
        getCardPayload(groupId) {
            return (index) => {
                return this.board.groups.filter((p) => p.id === groupId)[0].tasks[index]
            }
        },
        async onCardDrop(groupId, dropResult) {
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

                const updatedBoard = Object.assign({}, JSON.parse(JSON.stringify(this.board)))
                const group = updatedBoard.groups.filter((p) => p.id === groupId)[0]
                const itemIndex = updatedBoard.groups.indexOf(group)
                const newColumn = Object.assign({}, JSON.parse(JSON.stringify(group)))

                newColumn.tasks = await applyDrag(newColumn.tasks, dropResult)
                console.log('newColumn: ', newColumn)
                console.log('itemIndex: ', itemIndex)
                // debugger
                // updatedBoard.groups.splice(itemIndex, 1, JSON.parse(JSON.stringify(newColumn)))
                console.log('updatedBoard: ', updatedBoard)

                // // TODO: EMIT TO PARENT - UPDATE BOARD
                await this.$store.dispatch({ type: "saveGroup", group: newColumn });
                // this.$emit('saveBoard', updatedBoard)
            }
        },
        async saveGroup(title) {
            const group = Object.assign({}, this.group)
            group.title = title
            await this.$store.dispatch({ type: "saveGroup", group });
        },
    }

}
</script>

<style lang="scss" scoped>
</style>