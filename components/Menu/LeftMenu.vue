<template lang="pug">
  aside.aside
    nav
      ul.accordions
        li.accordion(v-for="(page, index) in pages" :class="{ 'is-active' : isActiveOnLoad(page.path) }")
          nuxt-link.accordion-header(:to="'/' + page.path + '/' + page.id + '?parent=' + page.title + '&isHomepage=' + (index < 1)") 
            span(v-if="index < 1") Homepage 
            span(v-else) {{ page.title }}
          .accordion-body(:class="{ 'is-active' : isActiveOnLoad(page.path) }")
            ul.accordion-content
              li(v-for="sublink in page.subLinks")
                nuxt-link(:to="'/' + page.path + '/' + sublink.id + '?parent=' + page.title + '&title=' + removeCamelCase(sublink.title) + '&asset=' + (sublink.title === 'hero')") {{ removeCamelCase(sublink.title) }}
        </article>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'LeftMenu',

    mounted () {
      this.toggle()
      this.openMenuOnLoad()
    },

    computed: {
      pages () {
        return this.$store.getters['content/getAllData']
      }
    },

    methods: {
      isActiveOnLoad (menuItem) {
        console.log(menuItem);
        const paths = Array.isArray(menuItem) ? menuItem : [menuItem];
    
        return paths.some(path => {
          return this.$route.params.slug === path // current path starts with this path string
        })
      },

      openMenuOnLoad () {
        const accordions = document.querySelector('.accordions')
        const accordion = accordions.querySelectorAll('.accordion')

        for(let i = 0; i < accordion.length; i++) {
          if (accordion[i].classList.contains('is-active')) {
            const body = accordion[i].querySelector('.accordion-body')
            body.style.maxHeight = `${body.scrollHeight}px`
          }
        }
      },

      toggle () {
        const accordions = document.querySelector('.accordions')
        const accordion = accordions.querySelectorAll('.accordion')
        const allBodies = accordions.querySelectorAll('.accordion-body')

        for(let i = 0; i < accordion.length; i++) {
          const header = accordion[i].querySelector('.accordion-header')

          header.addEventListener('click', (event) => {
            const body = event.target.nextElementSibling;

            for(let j = 0; j < allBodies.length; j++) {
              accordion[j].classList.remove('is-active')
              allBodies[j].style.maxHeight = null
            }  

            if (body.style.maxHeight) {
              body.style.maxHeight = null
            } else {
              body.style.maxHeight = `${body.scrollHeight}px`
            }

            event.target.parentNode.classList.add('is-active')
          })
        }
      },

      removeCamelCase (string) {
        return _.startCase(string);
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