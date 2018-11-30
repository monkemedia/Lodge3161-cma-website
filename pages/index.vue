<template lang="pug">
  section.hero.is-success.is-fullheight(v-cloak)
   .hero-body
    .container.has-text-centered
      .column.is-4.is-offset-4
        nuxt-link.title.has-text-grey(to="/") Login
        p.subtitle.has-text-grey Please login to proceed.
        .notification.is-danger(v-if="errorMessage")
          p {{ errorMessage }}
        .box
          form(@submit.prevent="submitForm")
            .field
              .control
                input.input.is-large(type="email" placeholder="Your Email" v-model="loginForm.username" autofocus="")
            .field
              .control
                input.input.is-large(type="password" placeholder="Your Password" v-model="loginForm.password")
            button.button.is-block.is-info.is-large.is-fullwidth(:class="{ 'is-loading': isLoading }") Login
</template>

<script>
  export default {
    middleware: [
      'isLoginPage'
    ],

    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        errorMessage: '',
        isLoading: false
      }
    },

    methods: {
      submitForm () {
        this.isLoading = true

        this.$store.dispatch('auth/login', this.loginForm)
          .then(res => {
            this.isLoading = false
            this.$router.push({ path: '/homepage' })
          })
          .catch(err => {
            console.log(err)
            this.errorMessage = err.response.data ? err.response.data.error : err.message
            this.isLoading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';

  .hero.is-success {
    background: $grey-200;
  }

  input {
    font-weight: 300;
  }

  p {
    font-weight: 700;
  }

  p.subtitle {
    padding-top: 1rem;
  }
</style>
