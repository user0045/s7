
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import HorizontalSection from '@/components/HorizontalSection';
import { getContentByType, getContentByGenre, getNewReleases, getPopular } from '@/data/mockContent';

const Movies = () => {
  const navigate = useNavigate();

  const heroContent = [
    {
      id: 1,
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      rating: "PG-13",
      year: "2008",
      score: "9.0",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 2,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      rating: "PG-13",
      year: "2010",
      score: "8.8",
      image: "https://images.unsplash.com/photo-1489599809927-48ef422749c8?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      rating: "PG-13",
      year: "2014",
      score: "8.6",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 4,
      title: "The Matrix",
      description: "A computer programmer discovers that reality as he knows it is a simulation controlled by cyber-intelligence, and joins a rebellion to break free.",
      rating: "R",
      year: "1999",
      score: "8.7",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 5,
      title: "Pulp Fiction",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      rating: "R",
      year: "1994",
      score: "8.9",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    }
  ];

  const sections = [
    { title: 'New Releases', contents: getNewReleases().filter(c => c.type === 'movie') },
    { title: 'Popular', contents: getPopular().filter(c => c.type === 'movie') },
    { title: 'Action & Adventure', contents: getContentByGenre('Action').filter(c => c.type === 'movie') },
    { title: 'Comedy', contents: getContentByGenre('Comedy').filter(c => c.type === 'movie') },
    { title: 'Crime', contents: getContentByGenre('Crime').filter(c => c.type === 'movie') },
    { title: 'Drama', contents: getContentByGenre('Drama').filter(c => c.type === 'movie') },
    { title: 'Horror', contents: getContentByGenre('Horror').filter(c => c.type === 'movie') },
    { title: 'Family', contents: getContentByGenre('Family').filter(c => c.type === 'movie') },
    { title: 'Thriller', contents: getContentByGenre('Thriller').filter(c => c.type === 'movie') },
    { title: 'Sci-Fi', contents: getContentByGenre('Sci-Fi').filter(c => c.type === 'movie') },
  ];

  const handleSeeMore = (title: string, contents: any[]) => {
    navigate('/see-more', { state: { title, contents } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSlider contents={heroContent} />
      
      <div className="container mx-auto px-6 py-4 space-y-4">
        {sections.map((section) => (
          <HorizontalSection
            key={section.title}
            title={section.title}
            contents={section.contents}
            onSeeMore={() => handleSeeMore(section.title, section.contents)}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;
