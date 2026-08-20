import { useState } from 'react';

export default function AddCardForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (onAddTask) {
      onAddTask(title.trim());
    }

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="กรอกชื่องาน..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: '6px 10px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '6px 12px',
          backgroundColor: '#0079bf',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        เพิ่ม
      </button>
    </form>
  );
}