<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" class="form-control" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isAuthenticated } from '../router';
  
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  
  const login = () => {
    const registeredUsername = localStorage.getItem('registeredUsername');
    const registeredPassword = localStorage.getItem('registeredPassword');
  
    console.log('Registered Username:', registeredUsername);
    console.log('Registered Password:', registeredPassword);
    console.log('Input Username:', username.value);
    console.log('Input Password:', password.value);
  
    if (username.value === registeredUsername && password.value === registeredPassword) {
      isAuthenticated.value = true;
      router.push({ name: 'About' });
    } else {
      router.push({ name: 'AccessDenied' });
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  .login-container h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .btn {
    display: block;
    width: 100%;
  }
  </style>
  