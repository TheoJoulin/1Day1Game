// Vérifier si l'utilisateur est connecté
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Si l'utilisateur est connecté, afficher son email
        document.getElementById('user-email').textContent = `Connecté en tant que ${user.email}`;
    } else {
        // Si l'utilisateur n'est pas connecté, afficher "Non connecté"
        document.getElementById('user-email').textContent = 'Non connecté';
    }
});
