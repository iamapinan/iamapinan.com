// Firebase initialization
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();

// Welcome message
function setWelcomeMessage() {
    const welcome = document.getElementById('welcome');
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    
    // Simulated weather data
    const weather = 'sunny';
    
    welcome.innerHTML = `
        <h1 class="text-3xl font-bold mb-4">${greeting}, welcome to iamapinan's blog!</h1>
        <p>The weather today is ${weather}. What would you like to read about?</p>
    `;
}

// Load latest articles
function loadLatestArticles() {
    db.ref('articles').orderByChild('date').limitToLast(5).once('value', (snapshot) => {
        const articles = snapshot.val();
        const latestArticles = document.getElementById('latestArticles');
        latestArticles.innerHTML = '';
        for (let id in articles) {
            latestArticles.innerHTML += `
                <div class="mb-4">
                    <h3 class="text-xl font-bold"><a href="/article.html?id=${id}">${articles[id].title}</a></h3>
                    <p>${articles[id].summary}</p>
                </div>
            `;
        }
    });
}

// Load popular articles
function loadPopularArticles() {
    db.ref('articles').orderByChild('views').limitToLast(5).once('value', (snapshot) => {
        const articles = snapshot.val();
        const popularArticles = document.getElementById('popularArticles');
        popularArticles.innerHTML = '';
        for (let id in articles) {
            popularArticles.innerHTML += `
                <div class="mb-4">
                    <h3 class="text-xl font-bold"><a href="/article.html?id=${id}">${articles[id].title}</a></h3>
                    <p>${articles[id].summary}</p>
                </div>
            `;
        }
    });
}

// Search functionality
document.getElementById('searchInput').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = e.target.value.toLowerCase();
        window.location.href = `/articles.html?search=${searchTerm}`;
    }
});

// Cookie consent
function setCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.classList.remove('hidden');
    }
    
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieConsent.classList.add('hidden');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setWelcomeMessage();
    loadLatestArticles();
    loadPopularArticles();
    setCookieConsent();
});