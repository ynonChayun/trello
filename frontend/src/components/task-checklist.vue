<template>
    <li class="clean-list task-checklist">
        <div class="flex justify-between items-center">
            <div class="flex align-center items-center">
                <img class="check-svg" src="../../src/svgs/check.svg" alt="" />
                <h4 v-if="!isEditTitleOpen" @click="openEditTitle" class="task-info-headline">
                    {{ checklist.title }}
                </h4>
                <editable-text v-else v-model="checklist.title" :value="'todo-title'" :type="'title'"
                    :elementType="'checklist'" :isEditFirst="true" @close-textarea="isEditTitleOpen = false"
                    @input="editTitle" class="editable-todo-title" />
            </div>

            <button @click="deleteChecklist" v-if="!isEditTitleOpen" class="button">
                Delete
            </button>
        </div>

        <div class="checklist-meter flex align-center items-center">
            <p class="checklist-percentage">{{ progressPercentage }}%</p>

            <div class="meter">
                <span :style="'width:' + progressPercentage + '%'">
                    <span class="progress"></span>
                </span>
            </div>
        </div>

        <form>

    <li v-for="todo in checklist.todos" :key="todo.id" class="clean-list flex  align-center items-center"
        :style="[todo.isDone ? { 'text-decoration': 'line-through' } : '']">
        <input class="checklist-checkbox" type="checkbox" :ref="todo.id" :id="todo.id" :name="todo.id"
            @click="toggleChecked(todo)" :checked="todo.isDone" />
        <div>
            <label :for="todo.id" v-if="todo.id !== currTodoId" @click="setCurrTodo(todo.id)">
                {{ todo.txt }}
            </label>

            <editable-text v-else v-model="todo.txt" :type="todo.id" :value="todo.id"
                :isEditFirst="todo.id === currTodoId" @close-textarea="isEditTodoOpen = false" @input="editTodo(todo)"
                class="editable-todo">
            </editable-text>
            <button @click.prevent="deleteTodo(todo)" class="btn close icon x delete-todo" />
        </div>
    </li>

    <button v-if="!isAddTodoOpen" @click="openAddTodo" class="button">
        Add an item
    </button>
    <editable-text v-else v-model="todo.txt" :value="'todo'" :type="'todo'" :isEditFirst="true"
        @close-textarea="isAddTodoOpen = false" @addTask="addTodo" class="editable-todo-add" />
    </form>
    </li>
</template>

<script>
import { boardService } from "../service/board-service";
import editableText from "./editable-text.vue";

export default {
    props: {
        checklist: Object,
    },
    data() {
        return {
            checklistTitle: "",
            todo: {
                txt: "",
                isDone: false,
            },
            isEditTitleOpen: false,
            isAddTodoOpen: false,

            currTodoId: "",
            isEditTodoOpen: false,
        };
    },
    computed: {
        progressPercentage() {
            if (!this.checklist.todos.length) return 0;
            const doneTodos = this.checklist.todos.filter((todo) => todo.isDone);
            const progress = Math.floor(
                (doneTodos.length / this.checklist.todos.length) * 100
            );
            return progress;
        },
    },
    methods: {
        openAddTodo() {
            this.isAddTodoOpen = true;
        },
        setCurrTodo(todoId) {
            this.currTodoId = todoId;
        },
        openEditTitle() {
            this.isEditTitleOpen = true;
        },
        editTitle() {
            this.checklist.title = this.checklistTitle;
            this.saveChecklist();
        },
        addTodo(val) {
            this.todo.txt = val
            if (!this.todo.txt) return
            if (!this.checklist.todos) this.checklist.todos = [];
            this.todo.id = boardService._makeId();
            this.checklist.todos.push({ ...this.todo });
            this.saveChecklist();
            console.log(this.checklist);
            this.todo = {
                txt: "",
                isDone: false,
            };
        },
        editTodo(todo) {
            const idx = this.checklist.todos.findIndex(({ id }) => id === todo.id);
            this.checklist.todos.splice(idx, 1, todo);
            this.saveChecklist();
        },
        deleteTodo(todo) {
            const idx = this.checklist.todos.findIndex(({ id }) => id === todo.id);
            this.checklist.todos.splice(idx, 1);
            this.saveChecklist();
        },
        toggleChecked(todo) {
            const checkBox = document.getElementById(todo.id);
            // const checkBox = this.$refs[todoId]
            if (checkBox.checked) todo.isDone = true;
            else todo.isDone = false;

            this.saveChecklist();
        },
        deleteChecklist() {
            this.$emit("delete-checklist", this.checklist.id);
        },
        saveChecklist() {
            this.$emit("save-todo", { ...this.checklist });
        },
    },
    components: {
        editableText,
    },
};
</script>
