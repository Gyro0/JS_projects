import { getPosts } from "./getPosts";

export async function getPost(id) {
    const posts = await getPosts();
    return posts.find(post => post.id === Number(id));
}