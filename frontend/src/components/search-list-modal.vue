<template>
    <input type="text">
    <p>{{ details.title }}</p>
    <ul>
        <li v-for="option in details.options">
            <button @click="chooseOption(isLabels ? option.id : option._id)">
                {{ isLabels ? option.title : option.fullname }}</button>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['details', 'selects'],
    methods: {
        chooseOption(selectId) {
            const selectIdx = this.selects.findIndex(select => select === selectId)
            selectIdx === -1 ? this.selects.push(selectId) : this.selects.splice(selectIdx, 1)
        }
    },
    computed : {
        isLabels(){
            return this.details.title === 'labels' ? true : false
        }
    }
}
</script>

<style>
</style>