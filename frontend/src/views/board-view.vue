<template>
    <router-link to='/board/b101/g102/c104'>go to task details</router-link>
    <router-view></router-view>
    <div v-if="board">
        <Container @drop="onColumnDrop($event)" group-name="cols" tag="div" orientation="horizontal">
            <Draggable v-for="(group, idx) in board.groups" :key="group.id">
                <!-- <group-preview :key="group.id" :group="group" :boardId="board._id" :idx="idx" /> -->
                <div>
                    {{ group.title }}
                    <Container orientation="vertical" group-name="col-items"
                        :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
                        :get-child-payload="getCardPayload(group.id)" @drop="onCardDrop(group, $event)">

                        <task-preview v-for="task in group.tasks" :boardId="board._id" :groupId="group.id" :task="task"
                            :key="task.id" @click.native="goToEdit(group.id, task.id)" />
                    </Container>
                </div>
            </Draggable>
        </Container>
    </div>
</template>

<script>
import { boardService } from '../service/board-service';
import { Container, Draggable } from "vue3-smooth-dnd";
import { applyDrag } from '../service/helpers.js'
import taskPreview from '../components/task-preview.vue'
import groupPreview from '../components/group-preview.vue'

export default {
    name: 'board-view',
    components: {
        Container,
        Draggable,
        taskPreview,
        groupPreview,
    },

    data() {
        return {
            board: null,
        };
    },
    async created() {
        const { boardId } = this.$route.params
        this.board = await boardService.getById(boardId)
    },
    methods: {
        goToEdit(groupId, taskId) {
            this.$router.push(`/board/${this.board._id}/${groupId}/${taskId}`)
            console.log('groupId: ')
        },
        onColumnDrop(dropResult) {
            const board = Object.assign({}, this.board)
            console.log('board: ', board)
            board.groups = applyDrag(board.groups, dropResult)
            this.board = board
        },
        getCardPayload(groupId) {
            return index => {
                return this.board.groups.filter(p => p.id === groupId)[0].tasks[index]
            }
        },
        async onCardDrop(currGroup, dropResult) {
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                const board = Object.assign({}, this.board)
                const group = currGroup
                console.log('group: ', group)
                const itemIndex = board.groups.indexOf(group)
                const newColumn = Object.assign({}, group)

                newColumn.tasks = await applyDrag(newColumn.tasks, dropResult)
                board.groups.splice(itemIndex, 1, newColumn)
                this.board = board
            }
        },
    },
    computed: {},
    unmounted() { },
}
</script>

<style>
.smooth-dnd-container.horizontal {
    display: flex !important;
}
</style>