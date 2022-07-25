<template>
    <div class="attachement-preview flex">
        <div :style="{
            backgroundImage: `url('${attachement.url}')`,
        }" class="img"></div>

        <div class="actions">
            <div class="attach-title">
                {{ attachement.title }}.jpg <span class="arrow">↗</span>
            </div>

            <div class="edit-menu">
                <span class="action" @click="$emit('removeAttachment', attachement.id)">Delete</span> -
                <span @click="editName = !editName">edit</span>

                <div class="popup" v-if="editName">
                    <div slot="header" class="task-popup-header">
                        <h2>Add Checklist</h2>
                        <img class="close-svg" @click="editName = false"
                            src="../../src/svgs/close_FILL0_wght400_GRAD0_opsz48.svg" alt="" />
                    </div>
                    <div slot="main " class="main-add-attachement">
                        <h3 class="add-attachement-title">Link name</h3>
                        <input type="text" name="title" class="attachement-title-input" v-model="attachement.title" />
                        <button @click="updateAttachement" class="add-attachement-btn">
                            Update
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        attachement: Object,
    },
    data() {
        return {
            editName: false,
        }
    },
    methods: {
        updateAttachement() {
                this.$emit('updateAttachment', this.attachement)
                this.editName = false
        }
    }
}
</script>

<style lang="scss" scoped>
</style>