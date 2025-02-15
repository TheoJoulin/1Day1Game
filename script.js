// Vérifier si l'utilisateur est connecté
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // L'utilisateur est connecté, afficher son email
        document.getElementById('user-email').textContent = user.email;
    } else {
        // Si l'utilisateur n'est pas connecté, laisser vide ou afficher un message
        document.getElementById('user-email').textContent = 'Non connecté';
    }
});
