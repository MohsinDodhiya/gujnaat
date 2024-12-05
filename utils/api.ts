const API_URL = "https://hushen.c1.biz/wp-json/wp/v2";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export async function fetchPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`)
    return handleResponse(response)
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts. Please try again later.')
  }
}

export async function fetchPost(id: number) {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post. Please try again later.');
  }
}

export async function createPost(title: string, content: string) {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WP_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ title, content, status: 'publish' }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post. Please try again later.');
  }
}

export async function updatePost(id: number, title: string, content: string) {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WP_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ title, content }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post. Please try again later.');
  }
}

export async function deletePost(id: number) {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WP_AUTH_TOKEN}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post. Please try again later.');
  }
}

