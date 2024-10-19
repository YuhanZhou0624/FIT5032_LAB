<template>
    <div class="book-container">
      <h1 class="title">Book Count</h1>
      <div v-if="error" class="error-message">
        <p>Error: {{ error.message }}</p>
      </div>
      <div v-else class="book-data">
        <h2>Total Books:</h2>
        <pre>{{ jsondata }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        jsondata: null,
        error: null
      };
    },
    mounted() {
      this.getBookCountAPI();
    },
    methods: {
      async getBookCountAPI() {
        try {
          const response = await axios.get('https://countbooks-uhkfjlqrmq-uc.a.run.app');
          this.jsondata = response.data;
          this.error = null;
        } catch (error) {
          console.error('Error fetching book count:', error);
          this.error = error;
          this.jsondata = null;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .book-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }
  
  .title {
    text-align: center;
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
  }
  
  .error-message {
    text-align: center;
    color: red;
    font-weight: bold;
  }
  
  .book-data {
    text-align: center;
  }
  
  .book-data h2 {
    color: #555;
    font-size: 1.8em;
  }
  
  pre {
    background-color: #e8e8e8;
    padding: 15px;
    border-radius: 5px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 1.2em;
  }
  </style>
  