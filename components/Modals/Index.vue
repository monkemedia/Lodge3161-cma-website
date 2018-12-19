<template lang="pug">
   .modal-card
      header.modal-card-head
        p.modal-card-title.has-text-centered
          slot(name="title")
      section.modal-card-body
        slot(name="body")
</template>

<script>
</script>

<style lang="scss" scope>
  .modal-card-head {
    background: white;
    border-bottom: 0;
    border-radius: 0;
  }
</style>
