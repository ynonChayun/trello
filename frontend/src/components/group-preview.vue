<template>

    <section class="group-preview">
        <group-actions-modal @close-group-actions="this.closeGroupActions" v-if="isGroupActionsShow" />
        <div class="group-content">

            <header class="flex flex-center group-header">
                <input class="input-title" @change="saveGroup" v-model="group.title" />
                <div class="more-options">
                    <svg @click="isGroupActionsShow = true" stroke="currentColor" fill="currentColor" stroke-width="0"
                        viewBox="0 0 512 512" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="256" cy="256" r="48"></circle>
                        <circle cx="416" cy="256" r="48"></circle>
                        <circle cx="96" cy="256" r="48"></circle>
                    </svg>
                </div>
            </header>
            <Container class="tasks-wrapper-vertical" orientation="vertical" group-name="col-items"
                :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
                :get-child-payload="getCardPayload(group.id)" @drop="(e) => onCardDrop(group, e)">

                <task-preview v-for="task in group.tasks" key="task.id" class="task" @removeTask="removeTask"
                    @click="goToEdit(task, task.id)" :boardId="board._id" :groupId="group.id" :task="task" @editIsToggle="onEditIsToggle">
                </task-preview>
            </Container>

            <footer>
                <div v-if="!isAddNewTask" class="add-card">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="icon"
                        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke="#5e6c84" stroke-width="2" d="M12,22 L12,2 M2,12 L22,12"></path>
                    </svg>
                    <button @click="isAddNewTask = true">
                        Add a card
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
        Draggable,
    },
    data() {
        return {
            isGroupActionsShow: false,
            newTask: JSON.parse(JSON.stringify(this.$store.getters.getEmptyTask)),
            isAddNewTask: false,
        }
    },
    methods: {
        closeGroupActions() {
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
            // return this.group.tasks[idx]

        },
        async onCardDrop(group, dropResult) {
            group.tasks = this.applyDrag(group.tasks, dropResult);
            this.$store.dispatch({ type: 'saveBoard', board: this.board });
        },
        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;
            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            // console.log(payload)
            // console.log(JSON.parse(JSON.stringify(payload)))
            let itemToAdd = payload;
            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }
            console.log('result: ', result)
            return result;
        },
        async saveGroup() {
            const group = Object.assign({}, this.group)
            await this.$store.dispatch({ type: "saveGroup", group });
        },
        undoAddTask() {
            this.isAddNewTask = false
        },
        onEditIsToggle() {
            this.$emit('onEditIsToggle')
        }
    }

}
</script>

<style lang="scss" scoped>
</style>
