<script lang="ts" setup>
  const enableFlag = useRuntimeConfig().enableFlag
</script>

<template>
  <h3>Tasmota mqttSave Project.</h3>
  <h3>EnableFlag: {{ enableFlag }}</h3>
</template>

<style scoped></style>
