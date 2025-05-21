import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ccf4wg8t',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { _id, name, comment } = JSON.parse(req.body);

  try {
    await client.patch(_id)
      .setIfMissing({ comments: [] })
      .append('comments', [{ name, comment, createdAt: new Date().toISOString() }])
      .commit();

    res.status(200).json({ message: 'Comment added!' });
  } catch (error) {
    console.error('Sanity error:', error);
    res.status(500).json({ message: 'Error submitting comment' });
  }
}