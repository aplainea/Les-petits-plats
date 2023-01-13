function router(app, currentPage) {
    let route;
    // Default Error message
    const messageError = "Vous êtes perdu ? Retournons à l'accueil.\nCette URL n'existe pas.";

    switch (currentPage) {
        // Home Page
        case '/':
        case '/index.html':
        case '/Les-petits-plats/index.html':
        case '/Les-petits-plats/':
            route = app.homePage();
            break;
    }
    return route;
}
