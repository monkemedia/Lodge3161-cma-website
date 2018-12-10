<template lang="pug">
  aside.aside
    nav
      ul.accordions
        li.accordion(v-for="m in menu" :class="{ 'is-active' : m.active || isActiveOnLoad(m.path) }")
          nuxt-link.accordion-header(:event="''" :to="m.path") {{ m.page }}
          .accordion-body(:class="{ 'is-active' : m.active || isActiveOnLoad(m.path) }")
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
              },
              {
                component: 'Hero',
                path: '/homepage/hero'
              },
              {
                component: 'Content Block Top',
                path: '/homepage/content-block-top'
              },
              {
                component: 'Content Block Bottom',
                path: '/homepage/content-block-bottom'
              },
              {
                component: 'Banner',
                path: '/homepage/banner'
              },
              {
                component: 'Feature Item 1',
                path: '/homepage/feature-item-1'
              },
              {
                component: 'Feature Item 2',
                path: '/homepage/feature-item-2'
              },
              {
                component: 'Feature Item 3',
                path: '/homepage/feature-item-3'
              }
            ]
          },
          {
            page: 'About',
            path: '/about',
            links: [
              {
                component: 'Main',
                path: '/about/main'
              }
            ]
          },
          {
            page: 'Location',
            path: '/location',
            links: [
              {
                component: 'Main',
                path: '/location/main'
              }
            ]
          }
        ]
      }
    },

    mounted () {
      this.toggle()
      this.openMenuOnLoad()
    },

    methods: {
      isActiveOnLoad (menuItem) {
        const paths = Array.isArray(menuItem) ? menuItem : [menuItem];
    
        return paths.some(path => {
          return this.$route.path.indexOf(path) === 0 // current path starts with this path string
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