<template lang="pug">
  aside.column.is-2
    .sticky
      ul.accordion-menu
        menu-item(:model="data" v-for="(data, index) in treeData" :key="index" :index="index")
        //- nav
        //-   ul.accordions
        //-     li.accordion.is-active
        //-       .accordion-header
        //-         span Pages
        //-       .accordion-body
        //-         ul.accordions
        //-           draggable(v-model="pages" @start="drag=true" @end="drag=false" @change="updateApiOrder")
        //-             transition-group
        //-               li.accordion(v-for="(page, index) in pages" :class="{ 'is-active is-selected' : isActiveOnLoad(page.path) }" :key="page.id")
        //-                 nuxt-link.accordion-header(:to="'/' + page.path + '/' + page.id + '?parent=' + page.title + '&isHomepage=' + (index < 1) + '&isParent=true'") 
        //-                   span(v-if="index < 1") Homepage 
        //-                   span(v-else) {{ page.title }}
        //-                 .accordion-body(:class="{ 'is-active' : isActiveOnLoad(page.path) }")
        //-                   ul.accordion-content
        //-                     li(v-for="sublink in page.subLinks")
        //-                       nuxt-link(:to="'/' + page.path + '/' + sublink.id + '?parent=' + page.title + '&title=' + removeCamelCase(sublink.title) + '&asset=' + (sublink.title === 'hero')") {{ removeCamelCase(sublink.title) }}
</template>

<script>
  // import _ from 'lodash'
  // import api from '@/api/contentful'
  import MenuItem from '@/components/Menu/MenuItem'
  // import draggable from 'vuedraggable'

  export default {
    name: 'LeftMenu',

    components: {
      // draggable,
      MenuItem
    },

    data () {
      return {
        treeData: [
            {
                title: 'Dashboard',
                path: '/dashboard',
                isParent: true,
                name: 'dashboard'
            },
            {
                title: 'Pages',
                path: '/templates',
                subLinks: this.$store.getters['content/getAllData'],
                isParent: true,
                name: 'templates'
            },
            {
                title: 'News',
                path: '/news',
                subLinks: [{
                    title: 'Tets'
                }],
                isParent: true,
                name: 'news'
            }
        ]
      }
    }

    // mounted () {
      // this.toggle()
      // this.openMenuOnLoad()
    // },

    // methods: {
    //   isActiveOnLoad (menuItem) {
    //     const paths = Array.isArray(menuItem) ? menuItem : [menuItem];
    
    //     return paths.some(path => {
    //       return this.$route.params.slug === path // current path starts with this path string
    //     })
    //   },

    //   openMenuOnLoad () {
    //     const accordions = document.querySelector('.accordions')
    //     const accordion = accordions.querySelectorAll('.accordion')

    //     for(let i = 0; i < accordion.length; i++) {
    //       if (accordion[i].classList.contains('is-active')) {
    //         const body = accordion[i].querySelector('.accordion-body')
    //         body.style.maxHeight = `${body.scrollHeight}px`
    //       }
    //     }
    //   },

    //   toggle () {
    //     const accordions = document.querySelector('.accordions')
    //     const accordion = accordions.querySelectorAll('.accordion')
    //     const allBodies = accordions.querySelectorAll('.accordion-body')

    //     for(let i = 0; i < accordion.length; i++) {
    //       const header = accordion[i].querySelector('.accordion-header')

    //       header.addEventListener('click', (event) => {
    //         const body = event.target.nextElementSibling;

    //         if (event.target.parentElement.classList.contains('is-active')) {
    //           event.target.nextElementSibling.style.maxHeight = null
    //           event.target.parentElement.classList.remove('is-active')
    //           return
    //         }

    //         for(let j = 0; j < allBodies.length; j++) {
    //           accordion[j].classList.remove('is-active', 'is-selected')
    //           allBodies[j].style.maxHeight = null
    //         }  

    //         if (body.style.maxHeight) {
    //           body.style.maxHeight = null
    //         } else {
    //           body.style.maxHeight = `${body.scrollHeight}px`
    //         }

    //         event.target.parentNode.classList.add('is-active', 'is-selected')
    //       })
    //     }
    //   },

    //   removeCamelCase (string) {
    //     return _.startCase(string);
    //   },

    //   updateApiOrder ({ publishable }) {
    //     const token = this.$store.getters['auth/getToken']
    //     const publish = publishable || false
    //     const promises = []

    //     this.pages.forEach((page, index) => {
    //       const entryId = page.id
    //       const formData = {
    //         order: index
    //       }
    //       if (page.path === 'home') { return } // Ignore homepage

    //       promises.push(api.updateData(token, formData, publish, entryId))
    //     })

    //     return Promise.all(promises)
    //       .then(res => {
    //         if (!publish) {
    //           this.updateApiOrder({ publishable: true })
    //           return
    //         }
    //         this.$toast.open({
    //           message: 'These changes are now live',
    //           type: 'is-success',
    //           duration: 5000,
    //           position: 'is-bottom-right',
    //           actionText: null
    //         })
    //       })
    //   }
    // }
  }
</script>

<style lang="scss">
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  aside.column {
    padding-right: 0;
  }

  .sticky {
    position: sticky;
    top: 0;
    width: 100%;
  }
</style>