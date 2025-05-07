/// FILE: plugins/echarts.client.ts

import { defineNuxtPlugin } from '#app'
import VueECharts from 'vue-echarts'
import { use } from 'echarts/core'

// Import the renderer
import { CanvasRenderer } from 'echarts/renderers'

// Import chart types
import { PieChart } from 'echarts/charts'

// Import components used
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

// Register all necessary parts
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('v-chart', VueECharts)
})
