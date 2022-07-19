
<template>
    <section class="tesk-details-container">
        <!-- <input type="text"> -->
    </section>
</template>

<script>
import { boardService } from '../service/board-service';

export default {
    created() {
        this.task = boardService.getTask(this.$route.params)
    }
}
</script>

<style>
.tesk-details-container {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    background-color: lightgreen;
}
</style>