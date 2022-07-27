<template>
    <<<<<<< HEAD <Draggable v-if="task">
        <div class="task-preview-container">

            <div @click.stop="openQuickEdit($event)" class="edit-task">
                <div class="edit-task">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="presentation" focusable="false"
                        viewBox="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z"
                            fill="currentColor" />
                    </svg>
                </div>
            </div>

            <section class="task-preview" v-if="!task.style || !task.style.isCover">

                <div class="upper-preview-background"></div>

                <div class="task-content">

                    <task-label :taskLabelIds="task.labelIds" class="labels-container" />

                    <p>{{ task.title }}</p>

                    <div class="task-badges">

                        <div class="badges">

                            <div class="desc" v-if="task.description">
                                <svg class="desc" stroke="currentColor" fill="#5e6c84" stroke-width="0"
                                    viewBox="0 0 26 26" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.46" y="3.06" width="23.08" height="2.18"></rect>
                                    <rect x="0.46" y="8.29" width="23.08" height="2.18"></rect>
                                    <rect x="0.46" y="13.53" width="23.08" height="2.18"></rect>
                                    <rect x="0.46" y="18.76" width="15.81" height="2.18"></rect>
                                </svg>
                            </div>

                            <div class="checklists" v-if="task.checklists && task.checklists.length">
                                <svg class="checklists" stroke="currentColor" fill="#5e6c84" stroke-width="0"
                                    viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
                                    style="filter: none;">
                                    <path
                                        d="M168.531 215.469l-29.864 29.864 96 96L448 128l-29.864-29.864-183.469 182.395-66.136-65.062zm236.802 189.864H106.667V106.667H320V64H106.667C83.198 64 64 83.198 64 106.667v298.666C64 428.802 83.198 448 106.667 448h298.666C428.802 448 448 428.802 448 405.333V234.667h-42.667v170.666z">
                                    </path>
                                </svg>
                                <span class="checklist-status">{{ donesChecklistsCounter }}/{{ task.checklists.length
                                }}</span>
                            </div>

                            <div class="activities-counter">
                                <svg class="activities" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="17px"
                                    viewBox="0 0 26 26" version="1.1">
                                    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="#5e6c84"
                                        fill-rule="evenodd">
                                        <g id="ic_fluent_comment_24_regular" fill="#5e6c84" fill-rule="nonzero">
                                            <path
                                                d="M5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L18.75,3 C20.5449254,3 22,4.45507456 22,6.25 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 Z M12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5,6.25 C20.5,5.28350169 19.7164983,4.5 18.75,4.5 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49899997,17.2497857 L7.49985739,20.2505702 L12.5135149,16.5 Z"
                                                id="🎨-Color" />
                                        </g>
                                    </g>
                                </svg>

                                <span>3</span>
                            </div>

                            <div class="atachments-counter" v-if="task.attachments">
                                <svg class="atach" xmlns="http://www.w3.org/2000/svg" width="17px" height="17px"
                                    viewBox="0 0 24 24" fill="#5e6c84">
                                    <path
                                        d="M5.602 19.8c-1.293 0-2.504-.555-3.378-1.44-1.695-1.716-2.167-4.711.209-7.116l9.748-9.87c.988-1 2.245-1.387 3.448-1.06 1.183.32 2.151 1.301 2.468 2.498.322 1.22-.059 2.493-1.046 3.493l-9.323 9.44c-.532.539-1.134.858-1.738.922-.599.064-1.17-.13-1.57-.535-.724-.736-.828-2.117.378-3.337l6.548-6.63c.269-.272.705-.272.974 0s.269.714 0 .986l-6.549 6.631c-.566.572-.618 1.119-.377 1.364.106.106.266.155.451.134.283-.029.606-.216.909-.521l9.323-9.439c.64-.648.885-1.41.69-2.145a2.162 2.162 0 0 0-1.493-1.513c-.726-.197-1.48.052-2.12.7l-9.748 9.87c-1.816 1.839-1.381 3.956-.209 5.143 1.173 1.187 3.262 1.629 5.079-.212l9.748-9.87a.683.683 0 0 1 .974 0 .704.704 0 0 1 0 .987L9.25 18.15c-1.149 1.162-2.436 1.65-3.648 1.65z" />
                                </svg>

                                <span>{{ task.attachments.length }}</span>
                            </div>

                        </div>

                        <ul class="members">
                            <li v-for="member in task.members" class="avater">
                                <img v-if="member.imgUrl" :src="member.imgUrl">
                                <span v-else-if="member.fullname">{{ getFirstsChars }}</span>
                            </li>
                        </ul>
                    </div>

                </div>

            </section>

            <section v-else class="task-preview-full-cover">
                <div v-if="task.style.bgColor" :style="{ 'background-color': task.style.bgColor }"
                    class="background-color-cover">
                    <p class="task-title">{{ task.title }} </p>
                </div>

                <div v-else-if="task.style.bgImg" class="background-img-cover"
                    :style="{ 'background-image': 'url(' + task.style.bgImg + ')' }" :class="{
                        'shadow': task.style.isShadow,
                        'none-shadow': !task.style.isShadow
                    }">

                    <div class="background-cover-efect"></div>

                    <p class=" task-title">{{ task.title }} </p>
                </div>

                <quick-edit @click.stop v-if="isQuickEdit" :task="task" :boardId="boardId" :groupId="groupId"
                    :position="position" @togglePopup="closeEdit" @taskEdited="saveTask" />
            </section>

        </div>
        </Draggable>
</template>

<script>
import { Draggable } from 'vue3-smooth-dnd'
import taskLabel from '../components/task-label.vue'
import quickEdit from './quick-edit.vue'

export default {
    name: "KanbanItem",
    components: {
        Draggable,
        taskLabel,
        quickEdit,

    },
    data() {
        return {
            isQuickEdit: false,
            quickEditDisplay: 'none',
            position: {
                top: null,
                left: null,
                width: null,
            }
        }
    },
    props: {
        task: Object,
        boardId: String,
        groupId: String,
    },
    methods: {
        removeTask() {
            const id = this.task.id
            this.$emit('removeTask', id)
        },
        openQuickEdit(ev) {
            const { left, right, top, bottom, width } = ev.target.getBoundingClientRect()
            this.position.left = left
            this.position.top = top
            this.position.width = width
            this.isQuickEdit = !this.isQuickEdit
            this.$emit('editIsToggle')
        },
        closeEdit() {
            this.isQuickEdit = false
            this.$emit('editIsToggle')
        },
        async saveTask(task) {
            await this.$store.dispatch({ type: "saveTask", task });
            this.closeEdit()
        },
    },
    computed: {
        donesChecklistsCounter() {
            let donesCheclists = 0
            this.task.checklists.forEach(cl => {
                if (!cl.todos.length) return
                else if (cl.todos.every(todo => todo.isDone === true)) donesCheclists++
            })

            return donesCheclists
        },
        getFirstsChars() {
            return 'YL'
        }
    }

}
</script>
