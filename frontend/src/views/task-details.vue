<template>
    <!-- <section class="task-details-container" v-if="task">

        <div class="header">
            <input class="task-title" type="text" v-model="task.title" />
            <button>x</button>
        </div>

    <div class="labels">
      labels
      <ul>
        <li v-for="label in task.labelIds">{{ label }}</li>
      </ul>
    </div>

    <div class="checklists">
      checklists
      <ul>
        <li v-for="checkList in task.checklists">
          {{ checkList.title }}
          <button @click="deleteChecklist(checkList.id)">delete</button>
        </li>
      </ul>
    </div>

    <div class="buttons">
      <button @click="membersModalIsShow = !membersModalIsShow">Members</button>
      <button @click="lablesModalIsShow = !lablesModalIsShow">Labels</button>
      <button>Checklist</button>


        <div class="buttons">
            <button @click="membersModalIsShow = !membersModalIsShow">members</button>
            <button @click="lablesModalIsShow = !lablesModalIsShow">labels</button>

    <checklist-modal @addChecklist="addChecklist" />

            <date-picker @setDouDate="setDouDate" />
            <filePicker @atachment="setAtachment" />
        </div>

        <checklist-modal @addChecklist="addChecklist" />

        <search-list-modal :details="getSearchListDetails('labels')" :selects="task.labelIds"
            v-if="lablesModalIsShow" />

        <search-list-modal @memberClicked="toggleMember" :boardMembers="boardMembers" v-if="membersModalIsShow" />
    </section> -->
    <section class="task-details-container" v-if="task">
        <div>
            <div class="header">
                <div class="flex justify-between items-center">
                    <div class="flex align-center items-center">
                        <img class="header-svg" src="../../src/svgs/screen.svg" alt="" />
                        <h1 class="task-title">{{ task.title }}</h1>
                    </div>
                    <img class="close-svg" src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg" alt="" />
                </div>
            </div>

            <div class="task-content flex justify-between">
                <div class="task-actions">
                    <task-control :task="task" @set-checklist="saveChecklist" />
                </div>

                <div class="task-main-content">
                    <task-duedate v-if="task.duedate" :duedate="task.duedate" @set-completion="setCompletion" />

                    <task-checklist v-if="task.checklists" v-for="checklist in task.checklists" :key="checklist.id"
                        class="checklist-container" :checklist="checklist" @save-todo="saveTodo"
                        @delete-checklist="deleteChecklist" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import searchListModal from '../components/search-list-modal.vue'
import checklistModal from '../components/awsome-cmps/checklist-modal.vue'
import datePicker from '../components/awsome-cmps/date-picker.vue'
import filePicker from '../components/awsome-cmps/file-picker.vue'

import { boardService } from '../service/board-service'

// TRY SOMTHING NEW
import taskControl from '../components/task-control.vue'
import taskChecklist from '../components/task-checklist.vue'
import taskDuedate from '../components/task-duedate.vue'

export default {

    data() {
        return {
            // task: null,
            boardLabels: null,
            boardMembers: null,
            lablesModalIsShow: false,
            membersModalIsShow: false,
        }
    },
    async created() {
        // this.boardLabels = this.$store.getters.boardLabels
        // this.boardMembers = this.$store.getters.boardMembers
        // const task = await boardService.getTask(this.$route.params)
        // this.task = JSON.parse(JSON.stringify(task))
    },
    components: {
        searchListModal,
        checklistModal,
        datePicker,
        filePicker,
        taskControl,
        taskChecklist,
        taskDuedate,
    },
    methods: {
        // deleteChecklist(clId) {
        //     const clIdx = this.task.checklists.findIndex((cl) => cl.id === clId)
        //     this.task.checklists.splice(clIdx, 1)
        // },
        // addChecklist(checklist) {
        //     this.task.checklists.push(checklist)
        // },
        // toggleMember(member) {
        //     const memberIdx = this.task.members.findIndex(
        //         (currMember) => currMember._id === member._id
        //     )
        //     if (memberIdx === -1) {
        //         this.task.members.push(member)
        //     } else {
        //         this.task.members = this.task.members.filter(
        //             (currMember) => currMember._id !== member._id
        //         )
        //     }

        // },
        // setDouDate(date) {
        //     this.task.douDate = date
        // },
        // setAtachment(attachment) {
        //     this.task.attachments ?
        //         this.task.attachments.push(attachment) :
        //         this.task.attachments = [attachment]
        // },
        saveChecklist(checklist) {
            const task = this.task;
            task.checklists.push(checklist);
            this.saveTask(task);
        },
        saveTask(task) {
            this.$store.dispatch({ type: "saveTask", task });
        },
        saveTodo(checklist) {
            const idx = this.task.checklists.findIndex(
                ({ id }) => id === checklist.id
            )
            this.task.checklists.splice(idx, 1, checklist);
            const task = this.task;
            this.saveTask(task)
        },
        deleteChecklist(checklistId) {
            const idx = this.task.checklists.findIndex(
                ({ id }) => id === checklistId
            );
            this.task.checklists.splice(idx, 1);
            const task = this.task;
            this.saveTask(task);
        },
        setCompletion(isComplete) {
            this.task.duedate.isComplete = isComplete;
            this.saveTask(this.task);
        }

    },
    computed: {
        task() {
            return JSON.parse(JSON.stringify(this.$store.getters.currTask));
        },
    }
}
//   async created() {
//     this.boardLabels = this.$store.getters.boardLabels
//     this.boardMembers = this.$store.getters.boardMembers
//     const task = await boardService.getTask(this.$route.params)
//     this.task = task
// },
// components: {
//     searchListModal,
//         checklistModal,
//         datePicker,
//         filePicker,
//   },
// methods: {
//     deleteChecklist(clId) {
//         const clIdx = this.task.checklists.findIndex((cl) => cl.id === clId)
//         this.task.checklists.splice(clIdx, 1)
//     },
//     addChecklist(checklist) {
//         this.task.checklists.push(checklist)
//     },
//     async toggleMember(member) {
//         let updatedTask = JSON.parse(JSON.stringify(this.task))
//         const memberIdx = updatedTask.members.findIndex(
//             (currMember) => currMember._id === member._id
//         )
//         if (memberIdx === -1) {
//             updatedTask.members.push(member)
//         } else {
//             updatedTask.members = updatedTask.members.filter(
//                 (currMember) => currMember._id !== member._id
//             )
//         }
//         console.log('updateTask', updatedTask)
//         const { groupId } = this.$route.params
//         await this.$store.dispatch({
//             type: 'saveTask',
//             groupId,
//             task: updatedTask,
//         })
//         var newTask = await boardService.getTask(this.$route.params)
//         console.log('newTask', newTask)
//         this.task = newTask
//     },
//     setDouDate(date) {
//         this.task.douDate = date
//     },
//     setAtachment(attachment) {
//         this.task.attachments
//             ? this.task.attachments.push(attachment)
//             : (this.task.attachments = [attachment])
//     },
//     closeTaskDetails() {
//         const { boardId } = this.$route.params
//         this.$router.push(`/board/${boardId}`)
//     },
// },
// }
</script>

<style>
</style>
