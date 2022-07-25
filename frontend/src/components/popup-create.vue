<template>
  <div class="popup popup-create" ref="container">
    <header ref="header">
      <slot name="header">Create board</slot>
    </header>
    <main ref="main">
      <slot name="main">
        <div class="label">Background</div>
        <div class="img-select">
          <img v-for="imgUrl in coverImgsUrls" :src="imgUrl" :key="imgUrl" />
        </div>
      </slot>
    </main>
    <footer ref="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Covermenu',
  props: {
    task: Object,
  },
  components: {},
  data() {
    return {
      file: {},
      colors: [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D',
      ],
      coverImgsUrls: [
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1275&q=80',
        'https://images.unsplash.com/photo-1561912847-95100ed8646c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1577009683331-950dd313c8d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1495236698374-12a308600d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1293&q=80',
      ],
    }
  },

  mounted() {
    //const beforeHeight = this.$refs.container.getBoundingClientRect().height;
    this.$nextTick(() => {
      const containerHeight =
        this.$refs.container.getBoundingClientRect().height
      // const diff = beforeHeight - containerHeight;
      const main = this.$refs.main
      const footerHeight = this.$refs.footer.getBoundingClientRect().height
      const headerHeight = this.$refs.header.getBoundingClientRect().height + 25
      main.style.maxHeight =
        containerHeight - (footerHeight + headerHeight) + 'px'
      //console.log("file: pop-up.vue - line 24 - this.$nextTick - diff", diff);
      //main.style.maxHeight = containerHeight - diff + "px";
    })
  },
  components: {},
}
</script>
