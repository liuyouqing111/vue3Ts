<template>
  <div class="world-map" ref="chartRef"></div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import geoJson from '@/utils/geoJson'
import * as echarts from 'echarts'
const myChart = ref<any>()
let chart: any = null
const chartRef = ref<HTMLHtmlElement>()
echarts.registerMap('world', geoJson as any)

const props = defineProps<{
  data: any[]
}>()

const options = computed(() => {
  return {
    geo: {
      map: 'world',
      zoom: 1.1,
      show: true,
      roam: false,
      label: {
        show: false
      },
      itemStyle: {
        areaColor: '#E3E3E3',
        borderColor: '#E3E3E3'
      },
      emphasis: {
        itemStyle: {
          areaColor: '#E3E3E3'
        },
        label: {
          show: false
        }
      }
    },
    series: [
      {
        type: 'effectScatter',
        symbolSize: 12,
        rippleEffect: {
          number: 1,
          brushType: 'fill',
          scale: 2,
          color: '#0B31BA'
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            return params.value[2]
          },
          fontWeight: 600,
          fontSize: 14
        },
        itemStyle: {
          color: '#0B31BA'
        },
        name: 'light',
        coordinateSystem: 'geo',
        data: props.data
      }
    ]
  }
})

watch(
  () => {
    return props.data
  },
  () => {
    if (chart) {
      chart.setOption(options.value)
    }
  },
  {
    deep: true
  }
)

onMounted(() => {
  nextTick(() => {
    chart = echarts.init(chartRef.value as HTMLElement)
    chart.setOption(options.value)
  })
  window.addEventListener('resize', () => {
    chart.resize()
  })
})

onUnmounted(() => {
  if (myChart.value) {
    chart.dispose()
  }
})
</script>

<style scoped lang="less">
.world-map {
  width: 100%;
  height: 100%;
}
</style>
