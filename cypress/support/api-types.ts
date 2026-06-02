/**
 * Typed models for the JSONPlaceholder API.
 * Keeps API specs type-safe instead of poking at untyped response bodies.
 */

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}
