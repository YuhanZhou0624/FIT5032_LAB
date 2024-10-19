<template>
  <div class="about-container">
    <h2>About Page</h2>
    <p>This is a secure area. Only authenticated users can see this.</p>
    <button @click="logout" class="btn btn-danger">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { isAuthenticated } from '../router';

const router = useRouter();

const logout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem('registeredUsername');
  localStorage.removeItem('registeredPassword');

  router.push({ name: 'Home' });
};
</script>

<style scoped>
.about-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}

.about-container h2 {
  margin-bottom: 20px;
}

.btn {
  margin-top: 20px;
}
</style>
