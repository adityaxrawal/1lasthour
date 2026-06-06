import React from 'react';

export const ListContent = ({ description, items, postDescription }) => (
  <div className="space-y-4">
    <p>{description}</p>
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item, idx) => (
        <li key={idx}>
          <strong>{item.title}:</strong> {item.text}
        </li>
      ))}
    </ul>
    {postDescription && <p>{postDescription}</p>}
  </div>
);
