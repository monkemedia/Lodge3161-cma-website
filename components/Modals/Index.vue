<template lang="pug">
   .modal-card
      header.modal-card-head
        p.modal-card-title.has-text-centered
          slot(name="title")
      section.modal-card-body
        slot(name="body")
      footer.modal-card-foot
        slot(name="footer")
</template>

<script>
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';

  .modal-card-head,
  .modal-card-body,
  .modal-card-foot {
    padding-left: 40px;
    padding-right: 40px;
  }

  .modal-card-head {
    padding-top: 40px;
    background: $white;
    border-bottom: 0;
    border-radius: 0;
  }

  .modal-card-foot {
    border-radius: 0;
    background: $white;
    border-top: 0;
    padding-bottom: 40px;
  }
</style>
