import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API Testing', () => {

  test('GET /posts - should return list of posts', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');

    expect(response.status()).toBe(200);
    const data = await response.json();

    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test('POST /posts - should create a post', async ({ request }) => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost
    });

    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data.title).toBe(newPost.title);
    expect(data.body).toBe(newPost.body);
    expect(data.userId).toBe(newPost.userId);
  });

  test('GET /posts/1 - should return specific post', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);
    const data = await response.json();

    expect(data.id).toBe(1);
  });

  test('PUT /posts/1 - should update a post', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'updated title',
      body: 'updated body',
      userId: 1
    };

    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: updatedPost
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.title).toBe(updatedPost.title);
  });

  test('DELETE /posts/1 - should delete a post', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);
  });

});
