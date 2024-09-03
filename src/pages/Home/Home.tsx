import React from 'react';

const Home: React.FC = () => {
  const podcasts = [
    { id: 1, title: 'Podcast 1', description: 'Description for Podcast 1' },
    { id: 2, title: 'Podcast 2', description: 'Description for Podcast 2' },
    { id: 3, title: 'Podcast 3', description: 'Description for Podcast 3' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Podcasts</h1>
      <ul className="list-disc pl-5 space-y-2">
        {podcasts.map(podcast => (
          <li key={podcast.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">{podcast.title}</h2>
            <p>{podcast.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;