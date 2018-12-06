<template lang="pug">
  section.hero.is-fullheight(v-cloak)
     .hero-body
      .container
        .columns
          .column.is-4.is-offset-4.has-text-centered
            img.logo(src="/logo-white.svg" alt="Dr James Griffith Hall Lodge - CMA")
        .columns
          .column.is-4.is-offset-4
            .notification.is-danger(v-if="errorMessage")
              p {{ errorMessage }}
            .box
              form(@submit.prevent="submitForm")
                .field
                  label.label Email Address
                  .control
                    input.input(type="email" v-model="loginForm.username" autofocus="")
                .field
                  label.label Password
                  .control
                    input.input(type="password" v-model="loginForm.password")
                button.button.is-block.is-info.is-primary.is-fullwidth(:class="{ 'is-loading': isLoading }") Login
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
            this.$router.push({ path: '/homepage/main' })
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
  @import '~assets/css/utilities/mixins.scss';
  @import '~assets/css/elements/form.scss';

  .logo {
    width: 220px;
    margin-bottom: 30px;
  }

  .hero {
    background: url('/login-background.jpg');
    background-size: cover;
  }

  .box {
    border-radius: 0;
    border: 0;
    box-shadow: none;
    padding: 40px;
  }

  input {
    font-weight: 300;
  }

  p {
    font-weight: 700;
  }

  .button {
    margin-bottom: 0;
  }

  p.subtitle {
    padding-top: 1rem;
  }
</style>
