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
                    input.input(
                      type="email" 
                      name="email" 
                      v-model="loginForm.username" 
                      v-validate="'required|email'")
                    p(v-show="errors.has('email')" class="help is-danger" v-html="errors.first('email')")
                .field
                  label.label Password
                  .control
                    input.input(
                      type="password"
                      name="password"
                      v-model="loginForm.password" 
                      v-validate="'required'")
                    p(v-show="errors.has('password')" class="help is-danger" v-html="errors.first('password')")
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
      async submitForm () {
        try {
          let result = await this.$validator.validateAll()
          if (!result) {
            return 
          }

          this.isLoading = true
          await this.$store.dispatch('auth/login', this.loginForm)
          this.isLoading = false
          window.location.href = '/'
        } catch (err) {
          this.errorMessage = err.message ? err.response.data.error : err.message
          this.isLoading = false
        }
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
