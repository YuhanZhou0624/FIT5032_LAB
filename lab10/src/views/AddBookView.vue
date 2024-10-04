<template>
    <div class="container">
      <h1 class="title">Add or Edit Book</h1>
      <form @submit.prevent="addOrEditBook" class="form">
        <div class="form-group">
          <label for="isbn" class="form-label">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" class="form-input" required />
        </div>
        <div class="form-group">
          <label for="name" class="form-label">Name:</label>
          <input type="text" v-model="name" id="name" class="form-input" required />
        </div>
        <button type="submit" class="submit-btn">{{ isEditing ? 'Edit Book' : 'Add Book' }}</button>
      </form>
      <BookList ref="bookList" :onEdit="editBook" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import db from '../firebase/init.js';
  import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
  import BookList from '../components/BookList.vue';
  
  export default {
    setup() {
      const isbn = ref('');
      const name = ref('');
      const currentBookId = ref(null);
      const isEditing = ref(false);
  
      const addOrEditBook = async () => {
        try {
          const isbnNumber = Number(isbn.value);
          if (isNaN(isbnNumber)) {
            alert('ISBN must be a valid number');
            return;
          }
  
          if (isEditing.value && currentBookId.value) {
            const bookRef = doc(db, 'books', currentBookId.value);
            await updateDoc(bookRef, {
              isbn: isbnNumber,
              name: name.value,
            });
            alert('Book updated successfully!');
          } else {
            await addDoc(collection(db, 'books'), {
              isbn: isbnNumber,
              name: name.value,
            });
            alert('Book added successfully!');
          }
  
          isbn.value = '';
          name.value = '';
          currentBookId.value = null;
          isEditing.value = false;
          refreshBookList();
        } catch (error) {
          console.error('Error adding or editing book: ', error);
        }
      };
  
      const editBook = (book) => {
        isbn.value = book.isbn;
        name.value = book.name;
        currentBookId.value = book.id;
        isEditing.value = true;
      };
  
      const refreshBookList = () => {
        const bookListComponent = this.$refs.bookList;
        if (bookListComponent && typeof bookListComponent.fetchBooks === 'function') {
          bookListComponent.fetchBooks();
        }
      };
  
      return {
        isbn,
        name,
        isEditing,
        addOrEditBook,
        editBook,
      };
    },
    components: {
      BookList,
    },
  };
  </script>
  
<style scoped>
  .container {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f7f7f7;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  .title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #555;
  }
  
  .form-input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }
  
  .form-input:focus {
    border-color: #007bff;
  }
  
  .submit-btn {
    padding: 10px 15px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
</style>
  