
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UpcomingContentData {
  title: string;
  contentType: string;
  releaseDate: string;
  ratingType?: string;
  description: string;
  thumbnailUrl: string;
  trailerUrl: string;
  contentOrder: string;
  selectedGenres: string[];
  directors: string[];
  writers: string[];
  cast: string[];
}

export const useCreateUpcomingContent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: UpcomingContentData) => {
      console.log('Creating upcoming content:', data);
      
      const { data: result, error } = await supabase
        .from('upcoming_content')
        .insert([{
          title: data.title,
          content_type: data.contentType as any,
          genre: data.selectedGenres,
          release_date: data.releaseDate,
          content_order: parseInt(data.contentOrder),
          rating_type: data.ratingType as any,
          directors: data.directors,
          writers: data.writers,
          cast_members: data.cast,
          thumbnail_url: data.thumbnailUrl,
          description: data.description,
          trailer_url: data.trailerUrl,
        }])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Upcoming content announced successfully!" });
      queryClient.invalidateQueries({ queryKey: ['upcoming-content'] });
    },
    onError: (error) => {
      console.error('Error creating upcoming content:', error);
      toast({ title: "Error", description: "Failed to announce content", variant: "destructive" });
    },
  });
};

export const useUpdateUpcomingContent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string } & UpcomingContentData) => {
      console.log('Updating upcoming content:', id, data);
      
      const { data: result, error } = await supabase
        .from('upcoming_content')
        .update({
          title: data.title,
          content_type: data.contentType as any,
          genre: data.selectedGenres,
          release_date: data.releaseDate,
          content_order: parseInt(data.contentOrder),
          rating_type: data.ratingType as any,
          directors: data.directors,
          writers: data.writers,
          cast_members: data.cast,
          thumbnail_url: data.thumbnailUrl,
          description: data.description,
          trailer_url: data.trailerUrl,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Upcoming content updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ['upcoming-content'] });
    },
    onError: (error) => {
      console.error('Error updating upcoming content:', error);
      toast({ title: "Error", description: "Failed to update content", variant: "destructive" });
    },
  });
};

export const useDeleteUpcomingContent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting upcoming content:', id);
      
      const { error } = await supabase
        .from('upcoming_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Upcoming content deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ['upcoming-content'] });
    },
    onError: (error) => {
      console.error('Error deleting upcoming content:', error);
      toast({ title: "Error", description: "Failed to delete content", variant: "destructive" });
    },
  });
};
