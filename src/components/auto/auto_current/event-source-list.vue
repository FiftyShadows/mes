<template>
<div>
  <div v-for="(eventSource,index) in eventSources" :key="index" class="box-card">
    <auto-doffing-event v-if="eventSource.type === 'AutoDoffingEvent'"></auto-doffing-event>
    <manual-doffing-event v-if="eventSource.type === 'ManualDoffingEvent'"></manual-doffing-event>
    <carpool-event v-if="eventSource.type === 'CarpoolEvent'"></carpool-event>
    <silk-runtime-tag-check-event v-if="eventSource.type === 'SilkRuntimeTagCheckEvent'"></silk-runtime-tag-check-event>
    <silk-runtime-detach-event v-if="eventSource.type === 'SilkRuntimeDetachEvent'"></silk-runtime-detach-event>
    <product-process-submit-event v-if="eventSource.type === 'ProductProcessSubmitEvent'" :eventSource="eventSource"></product-process-submit-event>
    <dyeing-sample-submit-event v-if="eventSource.type === 'DyeingSampleSubmitEvent'"></dyeing-sample-submit-event>
    <dyeing-prepare-first-submit-event v-if="eventSource.type === 'DyeingPrepareFirstSubmitEvent'"></dyeing-prepare-first-submit-event>
    <dyeing-prepare-cross-spindle-submit-event v-if="eventSource.type === 'DyeingPrepareCrossSpindleSubmitEvent'"></dyeing-prepare-cross-spindle-submit-event>
    <dyeing-prepare-cross-line-machine-submit-event v-if="eventSource.type === 'DyeingPrepareCrossLineMachineSubmitEvent'"></dyeing-prepare-cross-line-machine-submit-event>
    <dyeing-prepare-multi-submit-event v-if="eventSource.type === 'DyeingPrepareMultiSubmitEvent'"></dyeing-prepare-multi-submit-event>
    <dyeing-result-submit-event v-if="eventSource.type === 'DyeingResultSubmitEvent'"></dyeing-result-submit-event>
    <silk-car-runtime-grade-submit-event v-if="eventSource.type === 'SilkCarRuntimeGradeSubmitEvent'"></silk-car-runtime-grade-submit-event>
    <package-box-event v-if="eventSource.type === 'PackageBoxEvent'"></package-box-event>
    <temporary-boxIncrement-event v-if="eventSource.type === 'TemporaryBoxIncrementEvent'"></temporary-boxIncrement-event>
    <temporary-box-decrement-event v-if="eventSource.type === 'TemporaryBoxDecrementEvent'"></temporary-box-decrement-event>
    <silk-car-runtime-grade-event v-if="eventSource.type === 'SilkCarRuntimeGradeEvent'"></silk-car-runtime-grade-event>
  </div>
</div>
</template>
<script>
import SilkRuntimeTagCheckEvent from './silk-runtime-tag-check-event'
import AutoDoffingEvent from './auto-doffing-event'
import ManualDoffingEvent from './manual-doffing-event'
import CarpoolEvent from './carpool-event'
import SilkRuntimeDetachEvent from './silk-runtime-detach-event'
import ProductProcessSubmitEvent from './product-process-submit-event'
import DyeingSampleSubmitEvent from './dyeing-sample-submit-event'
import DyeingPrepareFirstSubmitEvent from './dyeing-prepare-first-submit-event'
import DyeingPrepareCrossSpindleSubmitEvent from './dyeing-prepare-cross-spindle-submit-event'
import DyeingPrepareCrossLineMachineSubmitEvent from './dyeing-prepare-cross-line-machine-submit-event'
import DyeingPrepareMultiSubmitEvent from './dyeing-prepare-multi-submit-event'
import DyeingResultSubmitEvent from './dyeing-result-submit-event'
import SilkCarRuntimeGradeSubmitEvent from './silk-car-runtime-grade-submit-event'
import PackageBoxEvent from './package-box-event'
import TemporaryBoxIncrementEvent from './temporary-boxIncrement-event'
import TemporaryBoxDecrementEvent from './temporary-box-decrement-event'
import SilkCarRuntimeGradeEvent from './silk-car-runtime-grade-event'
export default {
  components: {
    'silk-runtime-tag-check-event': SilkRuntimeTagCheckEvent,
    'auto-doffing-event': AutoDoffingEvent,
    'manual-doffing-event': ManualDoffingEvent,
    'carpool-event': CarpoolEvent,
    'silk-runtime-detach-event': SilkRuntimeDetachEvent,
    'product-process-submit-event': ProductProcessSubmitEvent,
    'dyeing-sample-submit-event': DyeingSampleSubmitEvent,
    'dyeing-prepare-first-submit-event': DyeingPrepareFirstSubmitEvent,
    'dyeing-prepare-cross-spindle-submit-event': DyeingPrepareCrossSpindleSubmitEvent,
    'dyeing-prepare-cross-line-machine-submit-event': DyeingPrepareCrossLineMachineSubmitEvent,
    'dyeing-prepare-multi-submit-event': DyeingPrepareMultiSubmitEvent,
    'dyeing-result-submit-event': DyeingResultSubmitEvent,
    'silk-car-runtime-grade-submit-event': SilkCarRuntimeGradeSubmitEvent,
    'package-box-event': PackageBoxEvent,
    'temporary-boxIncrement-event': TemporaryBoxIncrementEvent,
    'temporary-box-decrement-event': TemporaryBoxDecrementEvent,
    'silk-car-runtime-grade-event': SilkCarRuntimeGradeEvent
  },
  props: ['eventSources'],
  created () {
  }
}
</script>
<style lang="scss" scoped>
// 人员操作
</style>
