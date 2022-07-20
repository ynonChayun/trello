<template>
    <el-form class="demo-form-inline">
            <el-input v-model="title" />
            <el-button type="primary" @click="onSubmit">Add</el-button>
    </el-form>
</template>

<script >

export default {
    data() {
        return {
            title: 'Checklist'
        }
    },
    methods: {
        onSubmit() {
            this.$emit('addChecklist', this.title)
        }
    }
}
</script>
