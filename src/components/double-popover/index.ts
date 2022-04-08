import { App } from 'vue'
import DoublePopover from './ItDoublePopover.vue'

DoublePopover.install = (Vue: App) => {
  Vue.component(DoublePopover.name, DoublePopover)
}

export default DoublePopover
