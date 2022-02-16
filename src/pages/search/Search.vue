<template>
  <div>
     <!-- <h1> {{$route.params.keyword}}===={{a}}{{b}}</h1> -->
      <h1> {{$route.params.keyword}}========={{keyword}}</h1>
      <h2>{{$route.query.k}}=={{k}}</h2>
  </div>
</template>

<script>
export default {
name:'',
data(){},
props:['keyword','k']
}
</script>

<style>

</style>