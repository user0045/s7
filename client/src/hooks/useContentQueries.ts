
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAllContent = () => {
  return useQuery({
    queryKey: ['all-content'],
    queryFn: async () => {
      console.log('Fetching all content...');
      
      // Fetch movies with upload_content data
      const { data: movies, error: moviesError } = await supabase
        .from('upload_content')
        .select(`
          id,
          title,
          content_type,
          genre,
          movie:content_id (
            content_id,
            description,
            release_year,
            rating_type,
            rating,
            duration,
            director,
            writer,
            cast_members,
            thumbnail_url,
            trailer_url,
            video_url,
            feature_in,
            views
          )
        `)
        .eq('content_type', 'Movie');

      if (moviesError) throw moviesError;

      // Fetch shows
      const { data: shows, error: showsError } = await supabase
        .from('show')
        .select('*');

      if (showsError) throw showsError;

      // Fetch web series with seasons and episodes
      const { data: webSeries, error: webSeriesError } = await supabase
        .from('upload_content')
        .select(`
          id,
          title,
          content_type,
          genre,
          web_series:content_id (
            content_id,
            season_id_list
          )
        `)
        .eq('content_type', 'Web Series');

      if (webSeriesError) throw webSeriesError;

      console.log('Fetched content:', { movies, shows, webSeries });
      
      return {
        movies: movies || [],
        shows: shows || [],
        webSeries: webSeries || []
      };
    },
  });
};

export const useContentByFeature = (feature: string) => {
  return useQuery({
    queryKey: ['content-by-feature', feature],
    queryFn: async () => {
      console.log('Fetching content by feature:', feature);
      
      // Fetch movies with the feature
      const { data: movies, error: moviesError } = await supabase
        .from('upload_content')
        .select(`
          id,
          title,
          content_type,
          genre,
          movie:content_id (
            content_id,
            description,
            release_year,
            rating,
            thumbnail_url,
            feature_in
          )
        `)
        .eq('content_type', 'Movie');

      if (moviesError) throw moviesError;

      // Fetch shows with the feature
      const { data: shows, error: showsError } = await supabase
        .from('show')
        .select('*');

      if (showsError) throw showsError;

      // Filter content that has the specified feature
      const filteredMovies = movies?.filter(movie => 
        movie.movie?.feature_in?.includes(feature)
      ) || [];

      const filteredShows = shows?.filter(show => 
        show.feature_in?.includes(feature)
      ) || [];

      return [...filteredMovies, ...filteredShows];
    },
  });
};

export const useContentByGenre = (genre: string) => {
  return useQuery({
    queryKey: ['content-by-genre', genre],
    queryFn: async () => {
      console.log('Fetching content by genre:', genre);
      
      // Fetch movies with the genre
      const { data: movies, error: moviesError } = await supabase
        .from('upload_content')
        .select(`
          id,
          title,
          content_type,
          genre,
          movie:content_id (
            content_id,
            description,
            release_year,
            rating,
            thumbnail_url
          )
        `)
        .eq('content_type', 'Movie')
        .contains('genre', [genre]);

      if (moviesError) throw moviesError;

      // Fetch shows with the genre
      const { data: shows, error: showsError } = await supabase
        .from('show')
        .select('*')
        .contains('genres', [genre]);

      if (showsError) throw showsError;

      return [...(movies || []), ...(shows || [])];
    },
  });
};
