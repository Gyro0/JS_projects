export async function getPosts() {
    // Vérifier si les posts existent déjà dans localStorage
    const storedPosts = localStorage.getItem('posts');

    if (storedPosts) {
        // Si oui, retourner les posts stockés
        return JSON.parse(storedPosts);
    } else {
        // Sinon, récupérer depuis le fichier JSON
        try {
            const response = await fetch('/posts.json');
            const posts = await response.json();

            // Stocker dans localStorage pour les prochaines utilisations
            localStorage.setItem('posts', JSON.stringify(posts));

            return posts;
        } catch (error) {
            console.error("Erreur lors du chargement des posts:", error);
            return []; // Retourner un tableau vide en cas d'erreur
        }
    }
}

// Fonction pour ajouter un nouveau post
export async function addPost(post) {
    const posts = await getPosts();

    // Générer un nouvel ID (max ID + 1)
    const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
    const newPost = {
        ...post,
        id: maxId + 1
    };

    // Ajouter le nouveau post à la liste
    posts.push(newPost);

    // Mettre à jour localStorage
    localStorage.setItem('posts', JSON.stringify(posts));

    return newPost;
}

// Fonction pour mettre à jour un post existant
export async function updatePost(updatedPost) {
    const posts = await getPosts();

    // Trouver l'index du post à mettre à jour
    const index = posts.findIndex(post => post.id === updatedPost.id);

    if (index !== -1) {
        // Remplacer l'ancien post par le nouveau
        posts[index] = updatedPost;

        // Mettre à jour localStorage
        localStorage.setItem('posts', JSON.stringify(posts));
        return true;
    }
    return false;
}

// Fonction pour supprimer un post
export async function deletePost(id) {
    const posts = await getPosts();

    // Filtrer les posts pour exclure celui avec l'ID spécifié
    const updatedPosts = posts.filter(post => post.id !== id);

    // Mettre à jour localStorage si un post a été supprimé
    if (updatedPosts.length < posts.length) {
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        return true;
    }
    return false;
}