
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useUpcomingContent = () => {
  return useQuery({
    queryKey: ['upcoming-content'],
    queryFn: async () => {
      console.log('Fetching upcoming content from database...');
      const { data, error } = await supabase
        .from('upcoming_content')
        .select('*')
        .order('content_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching upcoming content:', error);
        throw error;
      }
      
      console.log('Fetched upcoming content:', data);
      return data;
    },
  });
};
