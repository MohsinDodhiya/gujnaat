'use server'

const API_URL = "https://hushen.c1.biz/wp-json/wp/v2"

async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const errorBody = await response.text()
    console.error(`API error: ${response.status} ${response.statusText}`, errorBody)
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export async function getPostDetails(id: number) {
  try {
    // Use public endpoints without authentication
    const [postResponse, commentsResponse] = await Promise.all([
      fetch(`${API_URL}/posts/${id}?_embed`, {
        next: { revalidate: 60 },
      }),
      fetch(`${API_URL}/comments?post=${id}`, {
        next: { revalidate: 60 },
      }),
    ])

    const [post, comments] = await Promise.all([
      handleApiResponse(postResponse),
      handleApiResponse(commentsResponse),
    ])

    // Extract author info from _embed data
    const author = post._embedded?.author?.[0] || {
      name: 'Anonymous',
      avatar_urls: { '48': '/placeholder.svg?height=48&width=48' }
    }

    return {
      ...post,
      author,
      comments,
    }
  } catch (error) {
    console.error('Failed to fetch post details:', error)
    throw new Error('Failed to fetch post details. Please try again later.')
  }
}

export async function getPosts() {
  try {
    const response = await fetch(`${API_URL}/posts?_embed`, {
      next: { revalidate: 60 },
    })
    return handleApiResponse(response)
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    throw new Error('Failed to fetch posts. Please try again later.')
  }
}

// Note: These operations typically require authentication and may not work with the current setup
export async function createPost(formData: FormData) {
  throw new Error('Creating posts is not supported without authentication')
}

export async function updatePost(id: number, formData: FormData) {
  throw new Error('Updating posts is not supported without authentication')
}

export async function deletePost(id: number) {
  throw new Error('Deleting posts is not supported without authentication')
}

