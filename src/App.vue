<template>
  <div id="app" >
    <div v-if="$route.meta.keepAlive">
      <Header/>
     <router-view/>
    </div>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'

export default {
  components: { Header },

  name: 'App',
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style>

</style>
