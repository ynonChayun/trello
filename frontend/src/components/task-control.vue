<template>
    <section class="flex flex-col">

        <div class="flex justify-between items-center">
            <h3 class="suggested-settings">Suggested</h3>
            <div class="flex flex-center svg-holder">
                <img class="settings-svg" src="../../src/svgs/settings.svg" alt="">
            </div>
        </div>

        <div class="action-btn">
            <img class="close-svg" src="../../src/svgs/user.svg" alt="" />
            <span class="action-span">Join</span>
        </div>

        <h3 class="add-to-card-txt">Add to card</h3>

        <div class="action-btn">
            <img class="close-svg" src="../../src/svgs/user.svg" alt="" />
            <span class="action-span">Members</span>
        </div>

        <div class="action-btn" @click="togglePopup('Checklist')">
            <img class="close-svg" src="../../src/svgs/check.svg" alt="" />
            <span class="action-span">Checklist</span>
        </div>
        <popup-checklist v-if="isChecklistOpen" @add-checklist="setChecklist" @toggle-popup="toggleCheklist" />

        <div class="action-btn">
            <img class="close-svg" src="../../src/svgs/date.svg" alt="">
            <span class="action-span" @click="togglePopup('Duedate')">Dates</span>
        </div>
        <popup-duedate v-if="isDuedateOpen" @toggle-popup="togglePopup" @save-date="saveDate"
            :taskDuedate="task.duedate" ref="Duedate" />

        <div class="action-btn">
            <img class="close-svg" src="../../src/svgs/label.svg" alt="">
            <span class="action-span" @click="togglePopup('Label', $event)">Labels</span>
        </div>
        <popup-label v-if="isLabelOpen" @set-task-labels="setTaskLabels" @toggle-popup="togglePopup" tabindex="0"
            ref="Label" :task="task">
        </popup-label>

        <!-- <span @click="togglePopup('Attachment')">Attachement</span>
        <popup-attachment v-if="isAttachmentOpen" @save-attachments="saveAttachments" @toggle-popup="togglePopup"
            :attachments="task.attachments" ref="Attachment" /> -->
    </section>
</template>

<script>
import { boardService } from '../service/board-service';
import popupChecklist from './popup-cheklist.vue'
import popupDuedate from './popup-duedate.vue'
import popupLabel from './popup-label.vue'
// import popupAttachment from './popup-attachment.vue'
export default {
    props: {
        task: Object,
    },
    components: {
        popupChecklist,
        popupDuedate,
        popupLabel
        // popupAttachment,
    },
    data() {
        return {
            isChecklistOpen: false,
            isDuedateOpen: false,
            isLabelOpen: false,
            isAttachmentOpen: false,
        }
    },
    methods: {
        togglePopup(str) {
            console.log('hi')
            var dataStr = `is${str}Open`;
            this[dataStr] = !this[dataStr];
        },
        toggleCheklist() {
            this.isChecklistOpen = false
        },
        setChecklist(checklist) {
            const task = JSON.parse(JSON.stringify(this.task))
            checklist.id = boardService._makeId();
            if (!task.checklists) task.checklists = []
            task.checklists.push(checklist);
            this.saveTask(task)
        },
        async saveTask(task) {
            await this.$store.dispatch({ type: "saveTask", task });
        },
        saveDate(duedate) {
            console.log('hiiiiiii')
            console.log('duedate: ', duedate)
            this.task.duedate = duedate;
            const task = JSON.parse(JSON.stringify(this.task))
            this.togglePopup("Duedate");
            this.saveTask(task);
        },
        setTaskLabels({ labelIds }) {
            this.task.labelIds = labelIds;
            const task = JSON.parse(JSON.stringify(this.task))
            console.log('task: ', task)
            this.saveTask(task);
        },
        saveAttachments(attachments) {
            console.log('attachments: ', attachments)
            // this.task.attachments = attachments;
            // const task = JSON.parse(JSON.stringify(this.task))
            // this.saveTask(task)
        },

    }

}
</script>