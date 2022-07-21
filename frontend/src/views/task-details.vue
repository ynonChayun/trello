<template>
  <section class="tesk-details-container" v-if="task">
    <!-- <pre>{{task}}</pre> -->
    <input type="text" v-model="task.title" />
    <mini-modal @addChecklist="addChecklist" />

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
      <button>dates</button>
      <button>atachment</button>
    </div>

    <search-list-modal
      :details="getSearchListDetails('labels')"
      :selects="task.labelIds"
      v-if="lablesModalIsShow"
    />

    <search-list-modal
      @memberClicked="toggleMember"
      :boardMembers="members"
      v-if="membersModalIsShow"
    />
  </section>
</template>

<script>
import searchListModal from '../components/search-list-modal.vue'
import miniModal from '../components/awsome-cmps/mini-modal.vue'

import { boardService } from '../service/board-service'

export default {
  data() {
    return {
      task: null,
      labels: null,
      lablesModalIsShow: false,
      members: null,
      membersModalIsShow: false,
    }
  },
  async created() {
    this.labels = this.$store.getters.currLabels
    this.members = this.$store.getters.currMembers
    const task = await boardService.getTask(this.$route.params)
    this.task = task
  },
  components: {
    searchListModal,
    miniModal,
  },
  methods: {
    getSearchListDetails(type) {
      return {
        title: type,
        options: type === 'labels' ? this.labels : this.members,
      }
    },
    deleteChecklist(clId) {
      const clIdx = this.task.checklists.findIndex((cl) => cl.id === clId)
      this.task.checklists.splice(clIdx, 1)
    },
    addChecklist(title) {
      console.log(title)
    },
    toggleMember(member) {
      const memberIdx = this.task.members.findIndex(
        (currMember) => currMember._id === member._id
      )
      if (memberIdx === -1) this.task.members.push(member)
      else {
        this.task.members = this.task.members.filter(
          (currMember) => currMember._id !== member._id
        )
      }
    },
  },
}
</script>

<style>
.tesk-details-container {
  z-index: 2;
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: lightgreen;
}
.tesk-details-container div {
  background-color: lightgrey;
  border: 1px solid black;
}
</style>
