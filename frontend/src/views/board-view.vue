<template>
    <router-link to='/board/b101/g102/c104'>go to task details</router-link>
    <router-view></router-view>
    <div v-if="board">
        <!-- <Container group-name="cols" tag="div" orientation="horizontal">
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
        </Container> -->
        <Container class="h-full flex overflow-x-auto gap-8  p-8" group-name="cols" tag="div" orientation="horizontal"
            @drop="onColumnDrop($event)">
            <Draggable class="bg-gray-200 dark:bg-gray-700 rounded-lg h-full w-96 flex-shrink-0 shadow-xl"
                v-for="(group, idx) in board.groups" :group="group" :key="group.id" :idx="idx">
                <div class="h-full flex flex-col">

                    <!-- header-->
                    <div class="cursor-move rounded-t-lg p-4 space-x-4 bg-primary text-white flex space-x-2">
                        <span>{{ group.title }}</span>
                    </div>

                    <!-- column -->
                    <Container class="flex-grow overflow-y-auto overflow-x-hidden" orientation="vertical"
                        group-name="group-items"
                        :shouldAcceptDrop="(e, payload) => (e.groupName === 'group-items' && !payload.loading)"
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

                        <!-- Items -->
                        <kanbanItem v-for="task in group.tasks" :key="task.id" :task="task" />
                    </Container>
                </div>
            </Draggable>
        </Container>
    </div>
</template>

<script>
import { boardService } from '../service/board-service';
import { Container, Draggable } from "vue3-smooth-dnd";
import boardGroup from '../components/board-group.vue'
import kanbanItem from '../components/kanban-Item.vue'

export default {
    name: 'board-view',
    components: {
        Container,
        Draggable,
        kanbanItem,
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
            console.log('dropResult: ', dropResult)
            const board = Object.assign({}, this.board)
            board.groups = this.applyDrag(board.groups, dropResult)
            this.board = board
        },
        async onCardDrop(groupId, dropResult) {
            console.log(': im the problem 88')

            // check if element where ADDED or REMOVED in current collumn
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                console.log(': afterchek')
                const board = Object.assign({}, this.board)
                console.log('board: ' , board)
                const group = await board.groups.filter(p => p.id === groupId)[0]
                console.log('board.groups: ' , board.groups)
                console.log('group: ' , group.id)
                const itemIndex =await  board.groups.indexOf(group.id)
                console.log('itemIndex: ' , itemIndex)
                const newColumn = Object.assign({}, group)
                console.log('newColumn: ' , newColumn)

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