<template>
    <!-- <section class="group">
        <div class="flex flex-center justify-between group-header">
            <editableTitle @input="saveGroup" v-model="group.title" :title="group.title"></editableTitle>
            <button @click="deleteGroup">Delete group</button>
        </div>

        <Container class="tasks-wrapper" orientation="vertical" group-name="col-items"
            :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
            :get-child-payload="getCardPayload(group.id)" @drop="onCardDrop(group.id, $event)">

            <task-preview @removeTask="removeTask" @click.native="goToEdit(task, task.id)" v-for="task in group.tasks"
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
    </section> -->
      

    <section class="group-preview">
        <group-actions-modal @close-group-actions="this.closeGroupActions" v-if="isGroupActionsShow" />
        <div class="group-content">

            <header class="flex flex-center group-header">
                <input class="input-title" @change="saveGroup" v-model="group.title" />
                <div class="more-options">
                    <svg @click="isGroupActionsShow = true" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1rem"
                        width="1rem" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="256" cy="256" r="48"></circle>
                        <circle cx="416" cy="256" r="48"></circle>
                        <circle cx="96" cy="256" r="48"></circle>
                    </svg>
                </div>
            </header>

            <Container class="tasks-wrapper " orientation="vertical" group-name="col-items"
                :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
                :get-child-payload="getCardPayload(group.id)" @drop="onCardDrop(group.id, $event)">

                <task-preview class="task" @removeTask="removeTask" @click.native="goToEdit(task, task.id)"
                    v-for="task in group.tasks" :boardId="board._id" :groupId="group.id" :task="task" :key="task.id" />
            </Container>

            <footer>
                <div v-if="!isAddNewTask" class="add-card">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="icon"
                        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="#5e6c84" stroke-width="2" d="M12,22 L12,2 M2,12 L22,12"></path>
                    </svg>
                    <button @click="isAddNewTask = true">
                        Add another card
                    </button>
                </div>
                <form class="save-card" v-else>
                    <textarea class="task" type="text" v-model="newTask.title" @change="addTask"
                        placeholder="Enter a title for this card" />

                    <div class="save-element-section">
                        <button @click.prevent="addTask">Add card</button>
                        <svg @click="undoAddTask" stroke="currentColor" fill="currentColor" stroke-width="0"
                            viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path>
                        </svg>
                    </div>
                    
                </form>
            </footer>
        </div>
    </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from '../service/helpers.js'
import taskPreview from '../components/task-preview.vue'
import editableTitle from '../components/editable-title.vue'
import editableText from "../components/editable-text.vue";
import groupActionsModal from '../components/group-actions-modal.vue'

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
        editableText,
        groupActionsModal,
    },
    data() {
        return {
             isGroupActionsShow : false,
            newTask: JSON.parse(JSON.stringify(this.$store.getters.getEmptyTask)),
            isAddNewTask: false,
        }
    },
    methods: {
        closeGroupActions(){
            this.isGroupActionsShow = false
        },
        async removeTask(taskId) {
            const updatedGroup = JSON.parse(JSON.stringify(this.group))
            const idx = updatedGroup.tasks.findIndex((task) => task.id === taskId)
            updatedGroup.tasks.splice(idx, 1)
            await this.$store.dispatch({ type: "saveGroup", group: updatedGroup });
        },
        async deleteGroup() {
            const id = this.group.id
            await this.$store.dispatch({
                type: "removeGroup",
                groupId: id,
            });
        },
        async addTask() {
            if (!this.newTask.title) return;
            await this.$store.dispatch({
                type: "saveTask",
                groupId: this.group.id,
                task: this.newTask,
            });
            this.newTask = JSON.parse(
                JSON.stringify(this.$store.getters.getEmptyTask)
            );
            // this.isAddNewTask = false;
        },
        goToEdit(task, taskId) {
            task = JSON.parse(JSON.stringify(task));
            this.$store.commit({ type: "setCurrTask", task });
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
                console.log('updatedBoard: ', updatedBoard)

                await this.$store.dispatch({ type: "saveGroup", group: newColumn });
            }
        },
        async saveGroup() {
            const group = Object.assign({}, this.group)
            await this.$store.dispatch({ type: "saveGroup", group });
        },
        undoAddTask() {
            this.isAddNewTask = false
        }
    }

}
</script>

<style lang="scss" scoped>
</style>