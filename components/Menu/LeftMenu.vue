<template lang="pug">
  aside.aside
    nav
      ul.accordions
        li.accordion(v-for="m in menu" :class="{ 'is-active' : m.active || isActiveOnLoad(m.path) }")
          //- nuxt-link.accordion-header(@click.native.prevent="m.active = !m.active" :event="''" :to="m.path") {{ m.page }}
          nuxt-link.accordion-header(@click.native.prevent="toggle($event)" :event="''" :to="m.path") {{ m.page }}
          .accordion-body
            ul.accordion-content
              li(v-for="link in m.links")
                nuxt-link(:to="link.path" exact) {{ link.component }}
        </article>
</template>

<script>
  export default {
    name: 'LeftMenu',

    data () {
      return {
        menu: [
          {
            page: 'Homepage',
            path: '/homepage',
            links: [
              {
                component: 'Main',
                path: '/homepage/main'
              }
            ],
            active: false
          },

          {
            page: 'About',
            path: '/about',
            links: [
              {
                component: 'Main',
                path: '/about/main'
              }
            ],
            active: false
          }
        ]
      }
    },

    methods: {
      isActiveOnLoad (menuItem) {
        const paths = Array.isArray(menuItem) ? menuItem : [menuItem];
    
        return paths.some(path => {
          return this.$route.path.indexOf(path) === 0 // current path starts with this path string
        })
      },

      toggle (event) {
        const accordion = this.$el.querySelectorAll('.accordion')

        for(let i = 0; i < accordion.length; i++) {
          accordion[i].classList.remove('is-active')
        }

        event.target.parentNode.classList.add('is-active')
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  .aside {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>