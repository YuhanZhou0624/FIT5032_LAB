<template>
    <div>
      <h1>Books with ISBN > 1000</h1>
      <div>
        <label for="limit">Number of Books to Display:</label>
        <input type="number" v-model="numLimit" id="limit" min="1" @change="fetchBooks" />
      </div>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button class="edit-btn" @click="editBook(book)">Edit</button>
          <button class="delete-btn" @click="deleteBook(book.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import db from '../firebase/init.js';
  import { collection, query, where, getDocs, orderBy, limit, doc, deleteDoc } from 'firebase/firestore';
  
  export default {
    props: ['onEdit'],
    setup(props) {
      const books = ref([]);
      const numLimit = ref(5);
  
      const fetchBooks = async () => {
        try {
          const q = query(
            collection(db, 'books'),
            where('isbn', '>', 1000),
            orderBy('isbn', 'asc'),
            limit(numLimit.value)
          );
          const querySnapshot = await getDocs(q);
          const booksArray = [];
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() });
          });
          books.value = booksArray;
        } catch (error) {
          console.error('Error fetching books: ', error);
        }
      };
  
      const deleteBook = async (id) => {
        try {
          await deleteDoc(doc(db, 'books', id));
          fetchBooks();
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      };
  
      const editBook = (book) => {
        props.onEdit(book);
      };
  
      onMounted(() => {
        fetchBooks();
      });
  
      return {
        books,
        numLimit,
        fetchBooks,
        deleteBook,
        editBook,
      };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 1.5rem;
    color: #333;
  }
  
  label {
    margin-right: 10px;
  }
  
  input {
    padding: 5px;
    margin-bottom: 20px;
    font-size: 1rem;
  }
  
  button {
    padding: 5px 10px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 5px;
  }
  
  .edit-btn {
    background-color: #28a745;
    color: white;
    transition: background-color 0.3s ease;
  }
  
  .edit-btn:hover {
    background-color: #218838;
  }
  
  .delete-btn {
    background-color: #dc3545;
    color: white;
    transition: background-color 0.3s ease;
  }
  
  .delete-btn:hover {
    background-color: #c82333;
  }
  </style>
  