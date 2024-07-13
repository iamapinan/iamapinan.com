// Firebase initialization
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function loadBiography() {
    db.ref('about/biography').once('value', (snapshot) => {
        const bio = snapshot.val();
        document.getElementById('bioContent').innerHTML = bio;
    });
}

function loadSkills() {
    db.ref('about/skills').once('value', (snapshot) => {
        const skills = snapshot.val();
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = '';
        skills.forEach(skill => {
            skillsList.innerHTML += `<li>${skill}</li>`;
        });
    });
}

function loadExperience() {
    db.ref('about/experience').once('value', (snapshot) => {
        const experiences = snapshot.val();
        const experienceList = document.getElementById('experienceList');
        experienceList.innerHTML = '';
        experiences.forEach(exp => {
            experienceList.innerHTML += `
                <div class="mb-4">
                    <h3 class="text-xl font-bold">${exp.title}</h3>
                    <p class="text-gray-600">${exp.company} | ${exp.date}</p>
                    <p>${exp.description}</p>
                </div>
            `;
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadBiography();
    loadSkills();
    loadExperience();
});