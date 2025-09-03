<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><a href="#">CRUD</a></li>
        <li><a href="#">Docs</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </aside>
    <main class="content">
      <CRUDTable :resource="Group" />
      
    </main>
  </div>
</template>

<script setup>
import { CRUDTable } from "fast-ui-builder/vue";
import { Group } from "./models/group";

</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background: #2d3e50;
  color: white;
  padding: 1rem;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

.content {
  flex: 1;
  padding: 2rem;
}
</style>