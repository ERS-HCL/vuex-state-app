<template>
<div>
    <div v-for="i in skCount" v-bind:key="i">
        <vcl-facebook :width=500 class="myskeleton"></vcl-facebook>
    </div> 
</div>
</template>

<script>
import { VclFacebook } from 'vue-content-loading';

export default {
  name: 'BookSkeleton',
  props: {
    skCount: Number
  },
  components: {
    VclFacebook
  }
};
</script>

<style scoped>
.myskeleton {
  margin: 10px;
}
</style>
