<template>
  <div v-clickoutside="hideDoublePopover" class="it-double-tooltip">
    <span
      ref="trigger"
      class="it-double-tooltip-trigger"
      @click="togglePopover"
    >
      <slot></slot>
    </span>
    <transition :name="`fade-${placement}`">
      <div
        v-show="show && !disabled"
        ref="first-popover"
        class="it-double-tooltip-first-popper"
        :class="[placement && `it-tooltip--double-${placement}`]"
        @click="togglePopover"
      >
        <div
          class="it-tooltip-first-content"
          :class="{
            'it-tooltip-first-content--borderless': borderless,
          }"
        >
          <slot name="firstContent" @click="togglePopover"></slot>
        </div>
      </div>
    </transition>
    <transition :name="`fade-${secondPlacement}`">
      <div
        v-show="show && !disabled"
        ref="second-popover"
        class="it-double-tooltip-second-popper"
        :class="[secondPlacement && `it-tooltip--double-${secondPlacement}`]"
        @click="togglePopover"
      >
        <div
          class="it-tooltip-second-content"
          :class="{
            'it-tooltip-second-content--borderless': borderless,
          }"
        >
          <slot name="secondContent"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePopover } from '@/hooks'
import { clickOutside } from '@/directives'
import { Positions } from '@/models/enums'

export default defineComponent({
  name: 'it-double-popover',
  directives: {
    clickoutside: clickOutside,
  },
  props: {
    disabled: Boolean,
    borderless: Boolean,
    placement: {
      type: String,
      default: Positions.T,
      validator: (value: Positions) =>
        [Positions.B, Positions.L, Positions.R, Positions.T].includes(value),
    },
    secondPlacement: {
      type: String,
      default: Positions.T,
      validator: (value: Positions) =>
        [Positions.B, Positions.L, Positions.R, Positions.T].includes(value),
    },
    autoposition: { type: Boolean, default: true },
  },
  data: () => ({
    isPopoverDisplayed: false,
  }),
  setup(props) {
    const {
      show,
      placement,
      disabled,
      clickable,
      transition,
      popover,
      trigger,
      position,
      hidePopover,
      showPopover,
      setPopoverPosition,
    } = usePopover(props)

    return {
      show,
      placement,
      disabled,
      clickable,
      transition,
      popover,
      trigger,
      position,
      hidePopover,
      showPopover,
      setPopoverPosition,
    }
  },
  methods: {
    togglePopover() {
      if (!this.isPopoverDisplayed) {
        this.showPopover()
        this.isPopoverDisplayed = true
      } else {
        this.hidePopover()
        this.isPopoverDisplayed = false
      }
    },
    hideDoublePopover() {
      this.hidePopover()
      this.isPopoverDisplayed = false
    },
  },
})
</script>
