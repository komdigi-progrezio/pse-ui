<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1">&copy; {{ new Date().getFullYear() }} PSE.</span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter',
}
</script>
