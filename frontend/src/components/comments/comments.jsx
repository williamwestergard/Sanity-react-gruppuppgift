import { useState } from 'react';

const CommentForm = ({ dinosaurId }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/submitComment', {
      method: 'POST',
      body: JSON.stringify({
        _id: dinosaurId,
        name,
        comment,
      }),
    });

    if (res.ok) {
      setSubmitted(true);
      setName('');
      setComment('');
    }
  };

  return submitted ? (
    <p>Thanks for your comment!</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." required />
      <button type="submit">Submit</button>
    </form>
  );
};