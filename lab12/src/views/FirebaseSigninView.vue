<template>
    <div class="container mt-5">
      <h2 class="text-center">Register</h2>
      <form @submit.prevent="signin">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            v-model="email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary btn-block">Register</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const signin = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log("Firebase Register Successful!");
        router.push("/");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
  }
  
  h2 {
    margin-bottom: 1.5rem;
  }
  
  .btn-block {
    width: 100%;
  }
  </style>
  