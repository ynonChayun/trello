<template>
    <div v-if="board">
        <!-- <Container @drop="onDrop"> -->
        <!-- <Draggable v-model="board.groups"> -->
        <!-- <board-group v-for="(group, idx) in board.groups" :group="group" :key="group.id" :idx="idx" /> -->

        <!-- </Draggable> -->
        <!-- </Container> -->
        <Container group-name="cols" tag="div" orientation="horizontal">
            <Draggable v-for="(group, idx) in board.groups" :group="group" :key="group.id" :idx="idx">
                <div>
                    <span>{{ group.title }}</span>
                </div>
                <Container orientation="vertical" group-name="col-items"
                    :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
                    :get-child-payload="getCardPayload(group.id)" :drop-placeholder="{
                        className:
                            `bg-primary bg-opacity-20  
                                                                                                                                                                            border-dotted border-2 
                                                                                                                                                                            border-primary rounded-lg mx-4 my-2`,
                        animationDuration: '200',
                        showOnTop: true
                    }" drag-class="bg-primary dark:bg-primary 
            border-2 border-primary-hover text-white 
            transition duration-100 ease-in z-50
            transform rotate-6 scale-110" drop-class="transition duration-100 
            ease-in z-50 transform 
            -rotate-2 scale-90" @drop="(e) => onCardDrop(group.id, e)">
                    <board-group v-for="task in group.tasks" :task=task />
                </Container>
            </Draggable>
        </Container>
    </div>
</template>

<script>
import { boardService } from '../service/board-service';
import { Container, Draggable } from "vue3-smooth-dnd";
import boardGroup from '../components/board-group.vue'

export default {
    name: 'board-view',
    components: {
        Container,
        Draggable,
        boardGroup
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
        applyDrag(arr, dragResult) {
            console.log(': im the problem 60')
            const { removedIndex, addedIndex, payload } = dragResult;

            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }
            return result;
        },
        getColumnHeightPx() {
            console.log(': im the problem 76')

            let kanban = document.getElementById('kanbanContainer');
            return kanban ? kanban.offsetHeight - 122 : 0;
        },
        onColumnDrop(dropResult) {
            console.log(': im the problem 82')
            const board = Object.assign({}, this.board)
            board.groups = this.applyDrag(board.groups, dropResult)
            this.board = board
        },
        onCardDrop(columnId, dropResult) {
            console.log(': im the problem 88')

            // check if element where ADDED or REMOVED in current collumn
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

                const board = Object.assign({}, this.board)
                const column = board.groups.filter(p => p.id === columnId)[0]
                const itemIndex = board.groups.indexOf(column)
                const newColumn = Object.assign({}, column)

                // check if element was ADDED in current column
                if ((dropResult.removedIndex == null && dropResult.addedIndex >= 0)) {
                    // your action / api call
                    dropResult.payload.loading = true
                    // simulate api call
                    setTimeout(function () { dropResult.payload.loading = false }, (Math.random() * 5000) + 1000);
                }

                newColumn.groups = this.applyDrag(newColumn.groups, dropResult)
                board.groups.splice(itemIndex, 1, newColumn)
                this.board = board
            }
        },
        getCardPayload(groupId) {
            console.log(': im the problem 112')

            return index => {
                return this.board.groups.filter(p => p.id === groupId)
            }
        },
    },
    computed: {},
    unmounted() { },
};
</script>

<style>
.smooth-dnd-container.horizontal {
    display: flex !important;
}
</style>