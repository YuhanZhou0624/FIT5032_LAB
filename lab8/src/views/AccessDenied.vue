<template>
    <div class="access-denied-container">
      <h2>Access Denied</h2>
      <p>You do not have permission to view this page. Please <router-link to="/login">log in</router-link> first.</p>
    </div>
  </template>
  
  <style scoped>
  .access-denied-container {
    text-align: center;
    padding: 20px;
  }
  </style>
  