<template>
  <section class="task-details-container" v-if="task">
    <!-- task title -->
    <div class="header">
      <input class="task-title" type="text" v-model="task.title" />
      <button @click="closeTaskDetails">x</button>
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
      <button @click="membersModalIsShow = !membersModalIsShow">Members</button>
      <button @click="lablesModalIsShow = !lablesModalIsShow">Labels</button>
      <button>Checklist</button>

      <date-picker @setDouDate="setDouDate" />
      <filePicker @atachment="setAtachment" />
    </div>

    <checklist-modal @addChecklist="addChecklist" />

    <!-- <search-list-modal :details="getSearchListDetails('labels')" :selects="task.labelIds"
            v-if="lablesModalIsShow" /> -->

    <search-list-modal
      @memberClicked="toggleMember"
      :boardMembers="boardMembers"
      v-if="membersModalIsShow"
    />
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
    filePicker,
  },
  methods: {
    deleteChecklist(clId) {
      const clIdx = this.task.checklists.findIndex((cl) => cl.id === clId)
      this.task.checklists.splice(clIdx, 1)
    },
    addChecklist(checklist) {
      this.task.checklists.push(checklist)
    },
    async toggleMember(member) {
      let updatedTask = JSON.parse(JSON.stringify(this.task))
      const memberIdx = updatedTask.members.findIndex(
        (currMember) => currMember._id === member._id
      )
      if (memberIdx === -1) {
        updatedTask.members.push(member)
      } else {
        updatedTask.members = updatedTask.members.filter(
          (currMember) => currMember._id !== member._id
        )
      }
      console.log('updateTask', updatedTask)
      const { groupId } = this.$route.params
      await this.$store.dispatch({
        type: 'saveTask',
        groupId,
        task: updatedTask,
      })
      var newTask = await boardService.getTask(this.$route.params)
      console.log('newTask', newTask)
      this.task = newTask
    },
    setDouDate(date) {
      this.task.douDate = date
    },
    setAtachment(attachment) {
      this.task.attachments
        ? this.task.attachments.push(attachment)
        : (this.task.attachments = [attachment])
    },
    closeTaskDetails() {
      const { boardId } = this.$route.params
      this.$router.push(`/board/${boardId}`)
    },
  },
}
</script>

<style></style>
