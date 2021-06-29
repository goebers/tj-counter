<template>
  <div class="header">
    <h1 class="header__title">
      {{ conscriptName }} TJ COUNTER
    </h1>
  </div>
</template>
<script>
  export default {
    name: 'Header',
    computed: {
      conscriptName() {
        return process.env.CONSCRIPT_NAME;
      }
    }
  }
</script>
<style scoped lang="scss">
  .header {
    display: flex;
    padding: 1em;
    border-bottom: 1px solid #e1d798;

    &__title {
      font-size: 2em;
      text-align: center;
      width: 100%;
      color: $text-color;
      text-shadow: -2px 3px $text-shadow-color;
      transition: 300ms all;
      text-transform: uppercase;

      &:hover {
        text-shadow: -4px 5px $text-shadow-color;
      }
    }
  }
</style>
