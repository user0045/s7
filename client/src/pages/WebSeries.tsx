
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import HorizontalSection from '@/components/HorizontalSection';
import { getContentByType, getContentByGenre, getNewReleases, getPopular } from '@/data/mockContent';

const WebSeries = () => {
  const navigate = useNavigate();

  const heroContent = [
    {
      id: 1,
      title: "Breaking Bad",
      description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
      rating: "TV-MA",
      year: "2008",
      score: "9.5",
      image: "https://images.unsplash.com/photo-1489599809927-48ef422749c8?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 2,
      title: "Stranger Things",
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      rating: "TV-14",
      year: "2016",
      score: "8.7",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 3,
      title: "The Crown",
      description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
      rating: "TV-MA",
      year: "2016",
      score: "8.6",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 4,
      title: "House of Cards",
      description: "A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.",
      rating: "TV-MA",
      year: "2013",
      score: "8.7",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 5,
      title: "Narcos",
      description: "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.",
      rating: "TV-MA",
      year: "2015",
      score: "8.8",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    }
  ];

  const sections = [
    { title: 'New Releases', contents: getNewReleases().filter(c => c.type === 'series') },
    { title: 'Popular', contents: getPopular().filter(c => c.type === 'series') },
    { title: 'Action & Adventure', contents: getContentByGenre('Action').filter(c => c.type === 'series') },
    { title: 'Comedy', contents: getContentByGenre('Comedy').filter(c => c.type === 'series') },
    { title: 'Crime', contents: getContentByGenre('Crime').filter(c => c.type === 'series') },
    { title: 'Drama', contents: getContentByGenre('Drama').filter(c => c.type === 'series') },
    { title: 'Horror', contents: getContentByGenre('Horror').filter(c => c.type === 'series') },
    { title: 'Family', contents: getContentByGenre('Family').filter(c => c.type === 'series') },
    { title: 'Thriller', contents: getContentByGenre('Thriller').filter(c => c.type === 'series') },
    { title: 'Sci-Fi', contents: getContentByGenre('Sci-Fi').filter(c => c.type === 'series') },
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

export default WebSeries;
