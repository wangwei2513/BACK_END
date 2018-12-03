<template>
  <div class="todo-list">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.name}}
        <i class="el-icon-error"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { findAll } from "../api/api.js";
export default {
  data() {
    return {
      todos: []
    };
  },
  methods: {

  },
  mounted() {
    findAll()
  }
};
</script>

<style>
</style>
