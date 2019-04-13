<template lang="pug">
  section.hero.is-fullheight(v-cloak)
     .hero-body
      .form-container
        //- figure
        //-   img.logo(src="/logo-white.svg" alt="Dr James Griffith Hall Lodge - CMA")
        .box
              .notification.is-danger(v-if="errorMessage")
                p {{ errorMessage }}
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
          this.errorMessage = err.response.data ? err.response.data.message : err.message
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

  .is-fullheight .hero-body {
    justify-content: center;
  }

  .form-container {
    max-width: 320px;
    width: 100%;
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
