import React, { useState, useEffect } from "react";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  onAuthStateChanged, // Add this line
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
  list
} from "firebase/storage";
import { marked } from "marked";
import MarkdownEditor from "@uiw/react-markdown-editor";

const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newArticle, setNewArticle] = useState({
    title: "",
    categories: "",
    tags: "",
    content: "",
  });
  const [previewContent, setPreviewContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("posts"); // Default active tab is "posts"

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        fetchContent();
        fetchMediaFiles();
        fetchCategories();
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setAuthUser(userCredential.user);
            fetchContent();
          })
          .catch((error) => console.error("Login error: ", error));
      })
      .catch((error) => {
        console.error("Persistence error: ", error);
      });
  };

  const fetchContent = () => {
    const db = getDatabase();
    const articlesRef = ref(db, "articles");
    const categoriesRef = ref(db, "categories");

    get(articlesRef).then((snapshot) => {
      setArticles(snapshot.exists() ? Object.values(snapshot.val()) : []);
    });

    get(categoriesRef).then((snapshot) => {
      setCategories(snapshot.exists() ? Object.values(snapshot.val()) : []);
    });
  };

  const fetchMediaFiles = () => {
    const storage = getStorage();
    const listRef = sRef(storage, "media/");
    listAll(listRef)
    .then((res) => {
        const promises = res.items.map((itemRef) => getDownloadURL(itemRef));
        return Promise.all(promises);
      })
      .then((urls) => {
        setMediaFiles(urls);
      })
      .catch((error) => {
        console.error("Error fetching media files:", error);
      });
  };

  const addCategory = () => {
    if (newCategory.trim() === "") return;
    const db = getDatabase();
    const newCategoryRef = ref(db, `categories/${newCategory}`);
    set(newCategoryRef, { name: newCategory }).then(() => {
      setNewCategory("");
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

  const handleArticleChange = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const saveArticle = () => {
    const db = getDatabase();
    const newArticleId = `article${Date.now()}`;
    const newArticleRef = ref(db, `articles/${newArticleId}`);
    set(newArticleRef, {
      ...newArticle,
      id: newArticleId,
      date: new Date().toISOString(),
    }).then(() => {
      setNewArticle({ title: "", categories: "", tags: "", content: "" });
      fetchContent();
      setShowComposeArticle(false);
    });
  };

  const previewArticle = () => {
    setPreviewContent(marked(newArticle.content));
  };

  const [showComposeArticle, setShowComposeArticle] = useState(false);

  const handleNewPost = () => {
    setShowComposeArticle(true);
  };

  const handleCloseComposeArticle = () => {
    setShowComposeArticle(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCategories = () => {
    const db = getDatabase();
    const categoriesRef = ref(db, "categories");

    get(categoriesRef).then((snapshot) => {
      setCategories(snapshot.exists() ? Object.values(snapshot.val()) : []);
    });
  };

  const uploadFile = () => {
    if (!file) return;
    const storage = getStorage();
    const fileRef = sRef(storage, `media/${file.name}`);
    uploadBytes(fileRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
      fetchMediaFiles(); // Refresh the list of media files
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const deleteMediaFile = async (index) => {
    // confirm delete
    const confirmDelete = window.confirm("Are you sure you want to delete this media file?");
    if (!confirmDelete) return;
      const storage = getStorage();
      // Create a reference to the file to delete
      const desertRef = sRef(storage, index);
      // Delete the file
      deleteObject(desertRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.error("Error deleting media file:", error);
      });
    
  }

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
      {!authUser ? (
        <div className="flex flex-col justify-self-center mx-auto justify-center mt-24 md:w-1/4 sm:w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Apinan Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mt-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mt-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <div className="my-10">
            <section className="overflow-hidden">
              <nav className="flex items-center justify-between py-3.5 px-7 bg-neutral-50">
                <div className="hidden xl:block w-full md:w-auto px-2 mr-auto">
                  <ul className="flex items-center">
                    <li
                      className={`mr-4 cursor-pointer ${
                        activeTab === "posts" ? "text-blue-500" : ""
                      }`}
                      onClick={() => handleTabChange("posts")}
                    >
                      <a className="text-sm font-medium" href="#">
                        Post
                      </a>
                    </li>
                    <li
                      className={`mr-4 cursor-pointer ${
                        activeTab === "media" ? "text-blue-500" : ""
                      }`}
                      onClick={() => handleTabChange("media")}
                    >
                      <a
                        className="text-sm font-medium hover:text-neutral-600"
                        href="#"
                      >
                        Media
                      </a>
                    </li>
                    <li
                      className={`mr-4 cursor-pointer ${
                        activeTab === "category" ? "text-blue-500" : ""
                      }`}
                      onClick={() => handleTabChange("category")}
                    >
                      <a
                        className="text-sm font-medium hover:text-neutral-600"
                        href="#"
                      >
                        Category
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </section>
            <h1 className="text-2xl mt-10 font-bold flex align-top justify-start">
            Admin
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            {activeTab.toUpperCase()}
          </h1>
          </div>
          {activeTab === "posts" && (
            <section className="mt-4 gap-2">
              <button
                onClick={handleNewPost}
                className="bg-blue-500 text-white px-4 py-2 mt-4 mr-4"
              >
                Compose
              </button>
              <table className="mt-4 w-full table-auto border mx-auto">
                <thead className="table-header-group">
                  <tr>
                    <th className="border bg-gray-100">Title</th>
                    <th className="border bg-gray-100">Categories</th>
                    <th className="border bg-gray-100">Publish Date</th>
                    <th className="border bg-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td className="border p-2">
                        <a href={"/article/" + article.id}>{article.title}</a>
                      </td>
                      <td className="border p-2">
                        {article.categories}
                      </td>
                      <td className="border p-2">
                        {article.date}
                      </td>
                      <td className="border text-center">
                        <button
                          onClick={() => deleteArticle(article.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
          {activeTab === "category" && (
            <section className="mt-4 gap-2">
              <input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="border p-2 mt-2"
              />
              <button
                onClick={addCategory}
                className="bg-green-500 text-white px-4 py-2 mt-2"
              >
                Create
              </button>

              <table className="mt-4 w-full table-auto border mx-auto">
                <thead>
                  <tr>
                    <th className="border bg-gray-100">Category Name</th>
                    <th className="border bg-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.name}>
                      <td className="border p-2">{category.name}</td>
                      <td className="border text-center">
                        <button
                          onClick={() => deleteCategory(category.name)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {activeTab === "media" && (
            <section className="mt-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="border p-1 mt-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                onClick={uploadFile}
                className="bg-blue-500 text-white px-4 py-2 mt-4"
              >
                Upload
              </button>

              <table className="mt-4 w-full table-auto border mx-auto">
                <thead>
                  <tr>
                    <th className="border bg-gray-100">Preview</th>
                    <th className="border bg-gray-100">Media URL</th>
                    <th className="border bg-gray-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaFiles.map((url, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        <img src={url} alt="media" className="w-20" />
                      </td>
                      <td className="border p-2">
                        <a href={url}>{url}</a>
                      </td>
                      <td className="border w-1/6 text-center">
                        <button
                          onClick={() => navigator.clipboard.writeText(url)}
                          className="bg-blue-500 text-white px-2 py-1 text-sm"
                        >
                          Copy URL
                        </button>
                        <button
                          onClick={() => deleteMediaFile(index)}
                          className="bg-red-500 text-white px-2 py-1 text-sm"
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          <section className="mt-4 mx-auto">
            {showComposeArticle && (
              <div className="popup bg-white fixed top-10 w-5/6 p-10 rounded-xl border shadow-xl">
                <div className="popup-content">
                  <button
                    onClick={handleCloseComposeArticle}
                    className="close-button absolute top-3 right-5"
                  >
                    X Close
                  </button>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newArticle.title}
                    onChange={handleArticleChange}
                    className="border p-2 mt-2 w-full"
                  />
                  <select
                    name="categories"
                    value={newArticle.categories}
                    onChange={(e) => {
                      setNewArticle({ ...newArticle, categories: e.target.value });
                    }}
                    className="border p-2 mt-2 w-full"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={newArticle.tags}
                    onChange={handleArticleChange}
                    className="border p-2 mt-2 w-full"
                  />
                  <MarkdownEditor
                    value={newArticle.content}
                    name="content"
                    className="border p-2 mt-2 w-full h-90"
                    height={500}
                    onChange={(value) =>
                      setNewArticle({ ...newArticle, content: value })
                    }
                  />
                  <button
                    onClick={previewArticle}
                    className="bg-gray-100 text-dark rounded px-4 py-2 mt-4"
                  >
                    Preview
                  </button>
                  <button
                    onClick={saveArticle}
                    className="bg-green-300 text-dark rounded px-4 py-2 mt-4 ml-2"
                  >
                    Save
                  </button>
                  {previewContent && (
                    <div className="preview mt-4 p-4 border rounded">
                      <h2 className="text-xl font-bold">Preview</h2>
                      <div
                        dangerouslySetInnerHTML={{ __html: previewContent }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
