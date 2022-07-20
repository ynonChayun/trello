
<template>
    <section class="tesk-details-container" v-if="task">
       <!-- <pre>{{task}}</pre> -->
       <input type="text" v-model="task.title" >
       <div class="memebers">
        <ul>
            <li v-for="member in task.memberIds">{{member}}</li>
        </ul>
        <ul>
            <li v-for="label in task.labelIds">{{label}}</li>
        </ul>
        <div class="buttons">
            <button>members</button>
            <button>labels</button>
            <button>checklist</button>
            <button>dates</button>
            <button>atachment</button>
        </div>
       </div>
       <pre>{{task}}</pre>
    </section>
</template>

<script>
import { boardService } from '../service/board-service';
import searchMultSection from '../components/awsomee-cmps'

export default {
    data() {
        return {
            task: null
        }
    },
    created() {
        boardService.getTask(this.$route.params).then(task => this.task = task)
    },
    components : {

    }
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
</style>