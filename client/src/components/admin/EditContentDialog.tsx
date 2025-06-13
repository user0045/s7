
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MovieForm from './MovieForm';
import WebSeriesForm from './WebSeriesForm';
import ShowForm from './ShowForm';

interface EditContentDialogProps {
  content: any;
  open: boolean;
  onClose: () => void;
  onSave: (updatedContent: any) => void;
}

const EditContentDialog = ({ content, open, onClose, onSave }: EditContentDialogProps) => {
  const [contentType, setContentType] = useState('');
  const [title, setTitle] = useState('');

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'Family',
    'Animation', 'Documentary', 'Reality'
  ];

  useEffect(() => {
    if (content) {
      setContentType(content.type || '');
      setTitle(content.title || '');
    }
  }, [content]);

  const handleFormSuccess = (formData: any) => {
    const updatedContent = {
      ...content,
      ...formData,
      title,
      type: contentType
    };
    onSave(updatedContent);
  };

  const handleCancel = () => {
    if (content) {
      setContentType(content.type || '');
      setTitle(content.title || '');
    }
    onClose();
  };

  const renderContentForm = () => {
    if (!content || !contentType) return null;

    const formProps = {
      title,
      genres,
      onSuccess: handleFormSuccess,
      initialData: content
    };

    switch (contentType) {
      case 'Movie':
        return <MovieForm {...formProps} />;
      case 'Web Series':
        return <WebSeriesForm {...formProps} />;
      case 'Show':
        return <ShowForm {...formProps} />;
      default:
        return (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Please select a content type to continue editing.</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black/90 via-dark-green/20 to-black/90 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter content title"
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content-type">Content Type</Label>
              <Select value={contentType} onValueChange={(value) => setContentType(value)}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="Web Series">Web Series</SelectItem>
                  <SelectItem value="Show">Show</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {renderContentForm()}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditContentDialog;
