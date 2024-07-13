// Firebase initialization
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentPage = 1;
const articlesPerPage = 16;

function loadCategories() {
    db.ref('categories').orderByChild('count').limitToLast(10).once('value', (snapshot) => {
        const categories = snapshot.val();
        const categoriesSection = document.getElementById('categories');
        categoriesSection.innerHTML = '<button class="category-btn active" data-category="all">All</button>';
        for (let category in categories) {
            categoriesSection.innerHTML += `
                <button class="category-btn" data-category="${category}">${category}</button>
            `;
        }
        addCategoryListeners();
    });
}

function addCategoryListeners() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            loadArticles(e.target.dataset.category);
        });
    });
}

function loadArticles(category = 'all', page = 1) {
    currentPage = page;
    let query = db.ref('articles').orderByChild('date');
    if (category !== 'all') {
        query = query.equalTo(category, 'category');
    }
    query.once('value', (snapshot) => {
        const articles = snapshot.val();
        const articlesList = document.getElementById('articlesList');
        articlesList.innerHTML = '';
        const startIndex = (page - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        let count = 0;
        for (let id in articles) {
            if (count >= startIndex && count < endIndex) {
                articlesList.innerHTML += `
                    <div class="mb-4 p-4 bg-white rounded shadow">
                        <h3 class="text-xl font-bold"><a href="/article.html?id=${id}" class="text-primary hover:underline">${articles[id].title}</a></h3>
                        <p class="text-gray-600">${articles[id].date}</p>
                        <p>${articles[id].summary}</p>
                    </div>
                `;
            }
            count++;
        }
        updatePagination(count);
    });
}

function updatePagination(totalArticles) {
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    const paginationSection = document.getElementById('pagination');
    paginationSection.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationSection.innerHTML += `
            <button class="pagination-btn ${i === currentPage ? 'bg-primary text-white' : 'bg-white'} px-3 py-1 rounded" data-page="${i}">${i}</button>
        `;
    }
    addPaginationListeners();
}

function addPaginationListeners() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = document.querySelector('.category-btn.active').dataset.category;
            loadArticles(category, parseInt(e.target.dataset.page));
        });
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = e.target.value.toLowerCase();
        // Implement search functionality here
        console.log('Searching for:', searchTerm);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadArticles();
});