import Vue from 'vue'
import inputField from '@/components/Forms/Fields/Input'
import tagsInputField from '@/components/Forms/Fields/TagsInput'
import textareaField from '@/components/Forms/Fields/Textarea'
import checkboxField from '@/components/Forms/Fields/Checkbox'
import markdownTextareaField from '@/components/Forms/Fields/MarkdownTextarea'
import errorMessage from '@/components/Forms/Errors/Index'

Vue.component('inputField', inputField)
Vue.component('tagsInputField', tagsInputField)
Vue.component('textareaField', textareaField)
Vue.component('checkboxField', checkboxField)
Vue.component('markdownTextareaField', markdownTextareaField)
Vue.component('errorMessage', errorMessage)
