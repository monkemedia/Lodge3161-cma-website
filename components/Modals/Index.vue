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
  .modal-card-head,
  .modal-card-body {
    padding-left: 40px;
    padding-right: 40px;
  }

  .modal-card-head {
    padding-top: 40px;
    background: white;
    border-bottom: 0;
    border-radius: 0;
  }

  .modal-card-body {
    padding-bottom: 40px;
  }
</style>
