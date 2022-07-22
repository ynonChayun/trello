<template>
    <section class="board-view">
        <router-view></router-view>
        <div v-if="board" class="board-canvas">
            <div class="board-fixed-container">
                <Container @drop="onColumnDrop($event)" group-name="cols" tag="div" orientation="horizontal">
                    <Draggable v-for="(group, idx) in board.groups" :key="group.id">
                        <div>
                            <group-preview class="group-container" @saveBoard="saveBoard" :key="group.id" :group="group"
                                :boardId="board._id" :idx="idx" :board="board" />
                        </div>
                    </Draggable>
                    <div class="add-new-group">
                        <button v-if="!isAddNewGroup" @click="isAddNewGroup = true" class="group-addition">

                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" stroke="#FFFFFF" stroke-width="2" d="M12,22 L12,2 M2,12 L22,12">
                                </path>
                            </svg>
                            &nbsp;
                            Add another list

                        </button>
                        <form v-else class="group-preview">
                            <input class="input-title" v-model="newGroup.title" type="text" @change="addGroup"
                                placeholder="Enter list title" />

                            <div class="save-list-actions">
                                <button class="save-button" @click.prevent="addGroup">Add list</button>
                                <svg @click="undoAddList" stroke="currentColor" fill="currentColor" stroke-width="0"
                                    viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path>
                                </svg>
                            </div>

                        </form>
                    </div>

                </Container>
            </div>
        </div>
        <!-- <div v-if="currBoard" class="board">
        <Container @drop="onColumnDrop($event)" group-name="cols" tag="div" orientation="horizontal">
            <Draggable v-for="(group, idx) in board.groups" :key="group.id">
                <div>
                    <group-preview @saveBoard="saveBoard" :key="group.id" :group="group" :boardId="board._id" :idx="idx"
                        :board="board" />
                </div>
            </Draggable>
            <div class="add-new-group">
                <button v-if="!isAddNewGroup" @click="isAddNewGroup = true" class="group-addition">
                    + Add another list
                </button>
                <editable-text v-else v-model="newGroup.title" :type="'title'" :isEditFirst="true"
                    :elementType="'group'" @close-textarea="isAddNewGroup = false" @input="addGroup" />
            </div>

        </Container>
    </div> -->
    </section>
</template>

<script>
import { boardService } from '../service/board-service'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../service/helpers.js'
import groupPreview from '../components/group-preview.vue'
import editableText from '../components/editable-text.vue'

export default {
    name: 'board-view',
    components: {
        Container,
        Draggable,
        groupPreview,
        editableText,
    },
    data() {
        return {
            // currBoard: null,
            isAddNewGroup: false,
            newGroup: JSON.parse(JSON.stringify(this.$store.getters.getEmptyGroup)),
        }
    },
    async created() {
        const { boardId } = this.$route.params
        await this.$store.dispatch({ type: "getById", boardId })
        // this.currBoard = this.board
        // 
        // this.board = await boardService.getById(boardId)
        // await this.$store.dispatch({ type: "getById", boardId})
        // console.log('this.board: ' , this.board)
        // await this.$store.dispatch({ type: "getById", boardId})
        // try {
        //     const { boardId } = this.$route.params
        //     const currBoard = await this.$store.dispatch({ type: 'getById', boardId })
        //     this.board = currBoard
        // } catch (err) {
        //     console.log('Cannot load board', err)
        //     throw err
        // }
    },
    methods: {
        goToEdit(groupId, taskId) {
            this.$router.push(`/board/${this.board._id}/${groupId}/${taskId}`)
            console.log('groupId: ')
        },
        onColumnDrop(dropResult) {
            const board = Object.assign({}, this.board)
            board.groups = applyDrag(board.groups, dropResult)
            this.saveBoard(board)
        },
        getCardPayload(groupId) {
            return (index) => {
                return this.currBoard.groups.filter((p) => p.id === groupId)[0].tasks[index]
            }
        },
        async saveBoard(board) {
            await this.$store.dispatch({ type: "saveBoard", board })
        },
        async addGroup(val) {
            this.newGroup.title = val
            if (!this.newGroup.title) return;
            // this.newGroup.board = { id: this.board._id };
            await this.$store.dispatch({ type: "saveGroup", group: this.newGroup });
            this.newGroup = JSON.parse(
                JSON.stringify(this.$store.getters.getEmptyGroup)
            );
            this.isAddNewGroup = false;
        },
        undoAddList(){

        }

    },
    computed: {
        board() {
            return this.$store.getters.currBoard
        }
    },
    unmounted() { },
}
</script>

<style>
.smooth-dnd-container.horizontal {
    display: flex !important;
}
</style>

<!-- <template>
    <router-view></router-view>
    <div v-if="currBoard" class="board">
        <Container @drop="onColumnDrop($event)" group-name="cols" tag="div" orientation="horizontal">
            <Draggable v-for="(group, idx) in currBoard.groups" :key="group.id">
                <div>
                    <group-preview @saveBoard="saveBoard" :key="group.id" :group="group" :boardId="currBoard._id"
                        :idx="idx" :board="currBoard" />
                </div>
            </Draggable>
            <div class="add-new-group">
                <button v-if="!isAddNewGroup" @click="isAddNewGroup = true" class="group-addition">
                    + Add another list
                </button>
                <editable-text v-else v-model="newGroup.title" :type="'title'" :isEditFirst="true"
                    :elementType="'group'" @close-textarea="isAddNewGroup = false" @input="addGroup" />
            </div>

        </Container>
    </div>
</template>

<script>
import { boardService } from '../service/board-service'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../service/helpers.js'
import groupPreview from '../components/group-preview.vue'
import editableText from '../components/editable-text.vue'

export default {
    name: 'board-view',
    components: {
        Container,
        Draggable,
        groupPreview,
        editableText,
    },
    data() {
        return {
            currBoard: null,
            isAddNewGroup: false,
            newGroup: JSON.parse(JSON.stringify(this.$store.getters.getEmptyGroup)),
        }
    },
    async created() {
        const { boardId } = this.$route.params
        await this.$store.dispatch({ type: "getById", boardId })
        this.currBoard = this.board
        
        this.board = await boardService.getById(boardId)
        await this.$store.dispatch({ type: "getById", boardId})
        console.log('this.board: ' , this.board)
        await this.$store.dispatch({ type: "getById", boardId})
        try {
            const { boardId } = this.$route.params
            const currBoard = await this.$store.dispatch({ type: 'getById', boardId })
            this.board = currBoard
        } catch (err) {
            console.log('Cannot load board', err)
            throw err
        }
    },
    methods: {
        goToEdit(groupId, taskId) {
            this.$router.push(`/board/${this.board._id}/${groupId}/${taskId}`)
            console.log('groupId: ')
        },
        onColumnDrop(dropResult) {
            const board = Object.assign({}, this.currBoard)
            console.log('board: ', board)
            board.groups = applyDrag(board.groups, dropResult)
            this.currBoard = board
            this.saveBoard(board)
        },
        getCardPayload(groupId) {
            return (index) => {
                return this.currBoard.groups.filter((p) => p.id === groupId)[0].tasks[index]
            }
        },
        async saveBoard(board) {
            await this.$store.dispatch({ type: "saveBoard", board })
            this.currBoard = this.$store.getters.currBoard
        }

    },
    computed: {
        board() {
            return this.$store.getters.currBoard
        }
    },
    unmounted() { },
}
</script>

<style>
.smooth-dnd-container.horizontal {
    display: flex !important;
}
</style> -->

                    <!-- {{ group.title }}
                    <Container orientation="vertical" group-name="col-items" :shouldAcceptDrop="
                        (e, payload) => e.groupName === 'col-items' && !payload.loading
                    " :get-child-payload="getCardPayload(group.id)" @drop="onCardDrop(group, $event)">
                        <task-preview v-for="task in group.tasks" :boardId="board._id" :groupId="group.id" :task="task"
                            :key="task.id" @click.native="goToEdit(group.id, task.id)" />
                    </Container> -->