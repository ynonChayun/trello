<template>
    <div>
        {{ group.title }}
        <Container orientation="vertical" group-name="col-items"
            :shouldAcceptDrop="(e, payload) => (e.groupName === 'col-items' && !payload.loading)"
            :get-child-payload="getCardPayload(group.id)" @drop="onCardDrop(group, $event)">
        </Container>

    </div>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
    props: {
        group: Object,
        boardId: String,
        idx: Number,
    },
    components: {
        Container
    }
}
</script>

<style lang="scss" scoped>
</style>