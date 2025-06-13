
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HomeHero from '@/components/HomeHero';
import HorizontalSection from '@/components/HorizontalSection';
import { useContentByFeature, useContentByGenre } from '@/hooks/useContentQueries';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Fetch content by feature flags
  const { data: heroContent, isLoading: heroLoading } = useContentByFeature('Home Hero');
  const { data: newReleases, isLoading: newReleasesLoading } = useContentByFeature('Home New Release');
  const { data: popular, isLoading: popularLoading } = useContentByFeature('Home Popular');
  
  // Fetch content by genres
  const { data: actionContent } = useContentByGenre('Action');
  const { data: comedyContent } = useContentByGenre('Comedy');
  const { data: crimeContent } = useContentByGenre('Crime');
  const { data: dramaContent } = useContentByGenre('Drama');
  const { data: horrorContent } = useContentByGenre('Horror');
  const { data: familyContent } = useContentByGenre('Family');
  const { data: thrillerContent } = useContentByGenre('Thriller');
  const { data: sciFiContent } = useContentByGenre('Sci-Fi');

  const handleSeeMore = (title: string, contents: any[]) => {
    navigate('/see-more', { state: { title, contents } });
  };

  const formatContentForDisplay = (content: any[]) => {
    return content?.map(item => ({
      id: item.id,
      title: item.title,
      image: item.movie?.thumbnail_url || item.thumbnail_url || '/placeholder.svg',
      type: item.content_type || item.content_type,
      rating: item.movie?.rating || item.rating || 0,
      genre: item.genre || item.genres || [],
      score: item.movie?.rating || item.rating || 0, // Add score property for Content type compatibility
    })) || [];
  };

  const sections = [
    { 
      title: 'New Releases', 
      contents: formatContentForDisplay(newReleases || []),
      isLoading: newReleasesLoading 
    },
    { 
      title: 'Popular', 
      contents: formatContentForDisplay(popular || []),
      isLoading: popularLoading 
    },
    { 
      title: 'Action & Adventure', 
      contents: formatContentForDisplay(actionContent || []) 
    },
    { 
      title: 'Comedy', 
      contents: formatContentForDisplay(comedyContent || []) 
    },
    { 
      title: 'Crime', 
      contents: formatContentForDisplay(crimeContent || []) 
    },
    { 
      title: 'Drama', 
      contents: formatContentForDisplay(dramaContent || []) 
    },
    { 
      title: 'Horror', 
      contents: formatContentForDisplay(horrorContent || []) 
    },
    { 
      title: 'Family', 
      contents: formatContentForDisplay(familyContent || []) 
    },
    { 
      title: 'Thriller', 
      contents: formatContentForDisplay(thrillerContent || []) 
    },
    { 
      title: 'Sci-Fi', 
      contents: formatContentForDisplay(sciFiContent || []) 
    },
  ];

  if (heroLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomeHero content={formatContentForDisplay(heroContent || [])} />
      
      <div className="container mx-auto px-6 py-8 space-y-8">
        {sections.map((section) => (
          <HorizontalSection
            key={section.title}
            title={section.title}
            contents={section.contents}
            onSeeMore={() => handleSeeMore(section.title, section.contents)}
            isLoading={section.isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
