// Initialisation Firebase (à adapter à tes besoins)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fonction pour récupérer les classements général et du jour
async function fetchRankings() {
    const generalRankingRef = db.collection('rankings').doc('general');
    const dailyRankingRef = db.collection('rankings').doc('daily');

    const generalSnapshot = await generalRankingRef.get();
    const dailySnapshot = await dailyRankingRef.get();

    // Mettre à jour les tableaux de classement
    const generalData = generalSnapshot.data().players;
    const dailyData = dailySnapshot.data().players;

    const generalTable = document.getElementById('general-ranking');
    const dailyTable = document.getElementById('daily-ranking');

    // Afficher les classements
    generalTable.innerHTML = generalData.slice(0, 10).map((player, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.points}</td>
        </tr>
    `).join('');

    dailyTable.innerHTML = dailyData.slice(0, 10).map((player, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.points}</td>
        </tr>
    `).join('');
}

// Affichage de la date et du timer
function updateTimer() {
    const currentDate = new Date();
    const dateElement = document.getElementById('current-date');
    dateElement.textContent = currentDate.toLocaleDateString();

    const timerElement = document.getElementById('timer');
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const timeRemaining = endOfDay - currentDate;
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
}

// Récupérer les missions du jour
async function fetchMissions() {
    const missionsRef = db.collection('missions').doc('daily');
    const snapshot = await missionsRef.get();
    const missionsData = snapshot.data().missions;

    const missionsList = document.getElementById('missions');
    missionsList.innerHTML = missionsData.map(mission => `
        <li>${mission}</li>
    `).join('');
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    fetchRankings();
    updateTimer();
    setInterval(updateTimer, 1000);
    fetchMissions();
});
