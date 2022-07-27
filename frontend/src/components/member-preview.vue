<template>
  <a class="flex center member-preview" :style="colorClassByInitials">
    {{ memberInitials }}
  </a>
  <!--TODO: <img
        v-if="member.imgUrl"
        :src="member.imgUrl"
        height="120px"
        width="120px"
      /> -->
</template>

<script>
export default {
  props: {
    member: Object,
  },
  methods: {
    toggleMemberDetails() {
      this.$emit("toggle-member-details", { ev, member });
    },
  },
  computed: {
    memberInitials() {
      if (this.member.username === "Guest") return "GU";
      const nameSplit = this.member.fullname.split(" ");
      var initials = nameSplit
        .map((word) => {
          return word.charAt(0).toUpperCase();
        })
        .join("");
      return initials;
    },
    colorClassByInitials() {
      const colors = ['#f2d600',
        '#ff9f1a',
        '#eb5a46',
        '#e377e0',
        '#0079bf',
        '#51e898',
      ]
      const color = colors[Math.floor(Math.random() * colors.length)]
      console.log('color: ', color)
      return { backgroundColor: color }
    }
  },
};
</script>

