
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import HorizontalSection from '@/components/HorizontalSection';
import { mockContent, getContentByGenre } from '@/data/mockContent';

const TvShows = () => {
  const navigate = useNavigate();

  const heroContent = [
    {
      id: 1,
      title: "Game of Thrones",
      description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
      rating: "TV-MA",
      year: "2011",
      score: "9.3",
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 2,
      title: "Friends",
      description: "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
      rating: "TV-14",
      year: "1994",
      score: "8.9",
      image: "https://images.unsplash.com/photo-1489599809927-48ef422749c8?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 3,
      title: "The Office",
      description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
      rating: "TV-14",
      year: "2005",
      score: "9.0",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 4,
      title: "Sherlock",
      description: "A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.",
      rating: "TV-14",
      year: "2010",
      score: "9.1",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
      id: 5,
      title: "The Sopranos",
      description: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state.",
      rating: "TV-MA",
      year: "1999",
      score: "9.2",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=400&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    }
  ];

  const tvContent = mockContent.filter(content => content.type === 'series' || content.type === 'tv');

  const sections = [
    { title: 'New Releases', contents: tvContent.slice(0, 8) },
    { title: 'Popular', contents: tvContent.filter(c => parseFloat(c.score) >= 8.5) },
    { title: 'Entertainment', contents: getContentByGenre('Comedy').filter(c => c.type === 'series' || c.type === 'tv') },
    { title: 'Reality Shows', contents: getContentByGenre('Reality').filter(c => c.type === 'series' || c.type === 'tv') },
    { title: 'Family Drama', contents: getContentByGenre('Drama').filter(c => c.type === 'series' || c.type === 'tv') },
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

export default TvShows;
