<template>
    <section class="task-details-container" v-if="task">

        <!-- task title -->
        <div class="header">
            <input class="task-title" type="text" v-model="task.title" />
            <button>x</button>
        </div>

        <div class="members">
            Members
            <ul style="background-color: aliceblue">
                <li v-for="member in task.members">{{ member.fullname }}</li>
            </ul>
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
            <button @click="membersModalIsShow = !membersModalIsShow">members</button>
            <button @click="lablesModalIsShow = !lablesModalIsShow">labels</button>

            <button>checklist</button>

            <date-picker @setDouDate="setDouDate" />
            <filePicker @atachment="setAtachment" />
        </div>

        <checklist-modal @addChecklist="addChecklist" />

        <!-- <search-list-modal :details="getSearchListDetails('labels')" :selects="task.labelIds"
            v-if="lablesModalIsShow" /> -->

        <search-list-modal @memberClicked="toggleMember" :boardMembers="boardMembers" v-if="membersModalIsShow" />
    </section>

</template>

<script>
import searchListModal from '../components/search-list-modal.vue'
import checklistModal from '../components/awsome-cmps/checklist-modal.vue'
import datePicker from '../components/awsome-cmps/date-picker.vue'
import filePicker from '../components/awsome-cmps/file-picker.vue'

import { boardService } from '../service/board-service'

export default {

    data() {
        return {
            task: null,
            boardLabels: null,
            boardMembers: null,
            lablesModalIsShow: false,
            membersModalIsShow: false,
        }
    },
    async created() {
        this.boardLabels = this.$store.getters.boardLabels
        this.boardMembers = this.$store.getters.boardMembers
        const task = await boardService.getTask(this.$route.params)
        this.task = task
    },
    components: {
        searchListModal,
        checklistModal,
        datePicker,
        filePicker
    },
    methods: {
        deleteChecklist(clId) {
            const clIdx = this.task.checklists.findIndex((cl) => cl.id === clId)
            this.task.checklists.splice(clIdx, 1)
        },
        addChecklist(checklist) {
            this.task.checklists.push(checklist)
        },
        toggleMember(member) {
            const memberIdx = this.task.members.findIndex(
                (currMember) => currMember._id === member._id
            )
            if (memberIdx === -1) {
                this.task.members.push(member)
            } else {
                this.task.members = this.task.members.filter(
                    (currMember) => currMember._id !== member._id
                )
            }

        },
        setDouDate(date) {
            this.task.douDate = date
        },
        setAtachment(attachment) {
            this.task.attachments ?
                this.task.attachments.push(attachment) :
                this.task.attachments = [attachment]
        }

    }
}
</script>

<style>
</style>
