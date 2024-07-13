import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, get, remove, child } from 'firebase/database';

const AdminPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authUser, setAuthUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const auth = getAuth();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setAuthUser(userCredential.user);
        fetchContent();
      })
      .catch(error => console.error('Login error: ', error));
  };

  const fetchContent = () => {
    const db = getDatabase();
    const articlesRef = ref(db, 'articles');
    const categoriesRef = ref(db, 'categories');

    get(articlesRef).then(snapshot => {
      setArticles(snapshot.exists() ? Object.values(snapshot.val()) : []);
    });

    get(categoriesRef).then(snapshot => {
      setCategories(snapshot.exists() ? Object.values(snapshot.val()) : []);
    });
  };

  const addCategory = () => {
    if (newCategory.trim() === '') return;
    const db = getDatabase();
    const newCategoryRef = ref(db, `categories/${newCategory}`);
    set(newCategoryRef, { name: newCategory }).then(() => {
      setNewCategory('');
      fetchContent();
    });
  };

  const deleteCategory = (categoryName) => {
    const db = getDatabase();
    const categoryRef = ref(db, `categories/${categoryName}`);
    remove(categoryRef).then(() => {
      fetchContent();
    });
  };

  const deleteArticle = (articleId) => {
    const db = getDatabase();
    const articleRef = ref(db, `articles/${articleId}`);
    remove(articleRef).then(() => {
      fetchContent();
    });
  };

  return (
    <div className="container mx-auto p-4">
      {!authUser ? (
        <div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 mt-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 mt-2"
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 mt-4">Login</button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <section className="mt-4">
            <h2 className="text-xl font-bold">Manage Categories</h2>
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="border p-2 mt-2"
            />
            <button onClick={addCategory} className="bg-green-500 text-white px-4 py-2 mt-2 ml-2">Add Category</button>
            <ul className="mt-4">
              {categories.map(category => (
                <li key={category.name} className="flex justify-between items-center border-b py-2">
                  {category.name}
                  <button onClick={() => deleteCategory(category.name)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-4">
            <h2 className="text-xl font-bold">Manage Articles</h2>
            <ul className="mt-4">
              {articles.map(article => (
                <li key={article.id} className="flex justify-between items-center border-b py-2">
                  {article.title}
                  <button onClick={() => deleteArticle(article.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminPage;