<template>
    <router-link to='/board/b101/g102/c104'>go to task details</router-link>
    <router-view></router-view>
    <!-- <div v-if="board">
        <Container class="h-full flex overflow-x-auto gap-8 p-8" group-name="cols" tag="div" orientation="horizontal"
            @drop="onColumnDrop($event)">

            <Draggable class="bg-gray-200 dark:bg-gray-700 rounded-lg h-full w-96 flex-shrink-0 shadow-xl"
                v-for="group in board.groups" :key="group.id">
                {{ group.title }}
                <div>
                    <Container class="flex-grow overflow-y-auto overflow-x-hidden" orientation="vertical"
                        group-name="col-tasks" :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-tasks')"
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
                        <kanban-Item v-for="task in group.tasks" :key="task.id" :task="task"></kanban-Item>
                    </Container>
                </div>
            </Draggable>

        </Container>
    </div> -->
    <div v-if="board">
        <Container @drop="onColumnDrop($event)" group-name="groups" tag="div" orientation="horizontal">
            <Draggable v-for="group in board.groups" :key="group.id">
                <div>
                    {{ group.title }}
                    <Container orientation="vertical" group-name="col-items"
                        :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items')"
                        :get-child-payload="getCardPayload(group.id)"
                        @drop="(e) => onCardDrop(group.id, e)">
                        <kanban-Item v-for="task in group.tasks" :task="task" :key="task.id"></kanban-Item>
                    </Container>
                </div>
            </Draggable>
        </Container>
    </div>
</template>

<script>
import { boardService } from '../service/board-service';
import boardGroup from '../components/board-group.vue'
import { Container, Draggable } from "vue3-smooth-dnd";
import kanbanItem from '../components/kanban-Item.vue'
import { applyDrag } from '../service/helpers.js'
// import { Container, Draggable } from 'vue-smooth-dnd'

export default {
    name: 'board-view',
    components: {
        Container,
        Draggable,
        kanbanItem,
        // boardGroup,
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
        onColumnDrop(dropResult) {
            const board = Object.assign({}, this.board)
            console.log('board: ', board)
            board.groups = applyDrag(board.groups, dropResult)
            this.board = board
        },
        getCardPayload(groupId) {
            return index => {
                return this.board.groups.filter(p => p.id === groupId)
            }
        },
        async onCardDrop(groupId, dropResult) {

            // check if element where ADDED or REMOVED in current collumn
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

                // const board = Object.assign({}, this.board)
                // console.log('board: ' , board)
                // const group = board.groups.filter(p => p.id === groupId)[0]
                // console.log('group0: ' , group)
                // const itemIndex = board.groups.indexOf(group)
                // console.log('itemIndex: ' , itemIndex)
                // const newColumn = Object.assign({}, group)
                // const board = await this.board
                // // console.log('board: ', board)
                // const group = await board.groups.filter(p => p.id === groupId)[0]
                // // console.log('group: ', group)
                // const itemIndex = await board.groups.indexOf(group)
                // // console.log('itemIndex: ', itemIndex)
                // const newColumn = await JSON.parse(JSON.stringify(group))
                const board = Object.assign({}, this.board)
                const group = board.groups.filter(p => p.id === groupId)[0]
                // console.log('group: ' , group)
                const itemIndex = board.groups.indexOf(group)
                // console.log('itemIndex: ' , itemIndex)
                const newColumn = Object.assign({}, group)

                // check if element was ADDED in current column
                // if ((dropResult.removedIndex == null && dropResult.addedIndex >= 0)) {
                //     // your action / api call
                //     dropResult.payload.loading = true
                //     // simulate api call
                //     setTimeout(function () { dropResult.payload.loading = false }, (Math.random() * 5000) + 1000);
                // }
                console.log('newColumn.tasks: ' , newColumn)

                newColumn.tasks = await applyDrag(newColumn.tasks, dropResult)
                board.groups.splice(itemIndex, 1, newColumn)
                this.board = board
            }
        },
        // onDrop(dropResult) {
        //     this.items = applyDrag(this.items, dropResult)
        // }
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