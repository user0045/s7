import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Search, Film, Tv, Calendar, Star, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EditContentDialog from './EditContentDialog';

interface Content {
  id: string;
  title: string;
  type: string;
  releaseYear: string;
  ratingType: string;
  rating: string;
  description: string;
  selectedGenres: string[];
  featuredIn: string[];
  thumbnailUrl: string;
  trailerUrl: string;
  videoUrl?: string;
  directors: string[];
  writers: string[];
  cast: string[];
  duration?: string;
  seasons?: any[];
  episodes?: any[];
  views: number;
}

type SortOrder = 'asc' | 'desc' | 'none';

const ManageContentTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<Content | null>(null);
  const [editContent, setEditContent] = useState<Content | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByViews, setSortByViews] = useState<SortOrder>('none');
  const itemsPerPage = 20;

  const [contents, setContents] = useState<Content[]>([
    {
      id: '1',
      title: 'The Shawshank Redemption',
      type: 'Movie',
      releaseYear: '1994',
      ratingType: 'R',
      rating: '9.3',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      selectedGenres: ['Drama'],
      featuredIn: ['trending'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      trailerUrl: 'https://example.com/trailer1',
      videoUrl: 'https://example.com/video1',
      directors: ['Frank Darabont'],
      writers: ['Stephen King', 'Frank Darabont'],
      cast: ['Tim Robbins', 'Morgan Freeman'],
      duration: '142',
      views: 2450000
    },
    {
      id: '2',
      title: 'Breaking Bad',
      type: 'Web Series',
      releaseYear: '2008',
      ratingType: 'TV-MA',
      rating: '9.5',
      description: 'A high school chemistry teacher turned methamphetamine producer.',
      selectedGenres: ['Crime', 'Drama'],
      featuredIn: ['popular'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400',
      trailerUrl: 'https://example.com/trailer2',
      directors: ['Vince Gilligan'],
      writers: ['Vince Gilligan'],
      cast: ['Bryan Cranston', 'Aaron Paul'],
      seasons: [
        {
          id: 'season-1',
          title: 'Season 1',
          description: 'The beginning of Walter White\'s transformation',
          releaseYear: '2008',
          ratingType: 'TV-MA',
          rating: '9.5',
          directors: ['Vince Gilligan'],
          writers: ['Vince Gilligan'],
          cast: ['Bryan Cranston', 'Aaron Paul'],
          thumbnailUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400',
          trailerUrl: 'https://example.com/trailer2',
          episodes: [
            {
              id: 'episode-1',
              title: 'Pilot',
              duration: '58',
              description: 'High school chemistry teacher Walter White is diagnosed with cancer.',
              videoUrl: 'https://example.com/episode1',
              thumbnailUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400'
            }
          ]
        }
      ],
      views: 3200000
    },
    {
      id: '3',
      title: 'The Office',
      type: 'Show',
      releaseYear: '2005',
      ratingType: 'TV-14',
      rating: '8.9',
      description: 'A mockumentary sitcom about office employees.',
      selectedGenres: ['Comedy'],
      featuredIn: ['trending'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
      trailerUrl: 'https://example.com/trailer3',
      directors: ['Greg Daniels'],
      writers: ['Greg Daniels', 'Michael Schur'],
      cast: ['Steve Carell', 'John Krasinski'],
      seasons: [
        {
          id: 'season-1',
          title: 'Season 1',
          description: 'The beginning of the documentary',
          releaseYear: '2005',
          ratingType: 'TV-14',
          rating: '8.9',
          directors: ['Greg Daniels'],
          writers: ['Greg Daniels'],
          cast: ['Steve Carell', 'John Krasinski'],
          thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
          trailerUrl: 'https://example.com/trailer3',
          episodes: [
            {
              id: 'episode-1',
              title: 'Pilot',
              duration: '22',
              description: 'A documentary crew follows the employees of Dunder Mifflin.',
              videoUrl: 'https://example.com/office-episode1',
              thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400'
            }
          ]
        }
      ],
      views: 1800000
    },
    {
      id: '4',
      title: 'Inception',
      type: 'Movie',
      releaseYear: '2010',
      ratingType: 'PG-13',
      rating: '8.8',
      description: 'A thief who steals corporate secrets through dream-sharing technology.',
      selectedGenres: ['Sci-Fi', 'Action'],
      featuredIn: ['popular'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
      trailerUrl: 'https://example.com/trailer4',
      videoUrl: 'https://example.com/video4',
      directors: ['Christopher Nolan'],
      writers: ['Christopher Nolan'],
      cast: ['Leonardo DiCaprio', 'Marion Cotillard'],
      duration: '148',
      views: 2900000
    }
  ]);

  const contentTypes = ['Movie', 'Web Series', 'Show'];

  const filteredContents = useMemo(() => {
    let filtered = contents.filter(content => {
      const searchMatch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.rating.includes(searchTerm);
      const typeMatch = contentTypeFilter === 'all' ? true : content.type === contentTypeFilter;
      return searchMatch && typeMatch;
    });

    // Apply sorting
    if (sortByViews !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        return sortByViews === 'desc' ? b.views - a.views : a.views - b.views;
      });
    }

    return filtered;
  }, [contents, searchTerm, contentTypeFilter, sortByViews]);

  // Pagination
  const totalPages = Math.ceil(filteredContents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContents = filteredContents.slice(startIndex, startIndex + itemsPerPage);

  // Calculate statistics
  const totalMovies = contents.filter(c => c.type === 'Movie').length;
  const totalSeries = contents.filter(c => c.type === 'Web Series').length;
  const totalShows = contents.filter(c => c.type === 'Show').length;
  const totalViews = contents.reduce((sum, c) => sum + c.views, 0);

  const handleEdit = useCallback((content: Content) => {
    setEditContent(content);
  }, []);

  const handleEditSave = useCallback((updatedContent: Content) => {
    setContents(prev => prev.map(content => 
      content.id === updatedContent.id ? updatedContent : content
    ));
    setEditContent(null);
  }, []);

  const handleDelete = useCallback((content: Content) => {
    setDeleteConfirm(content);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteConfirm) {
      setContents(prev => prev.filter(content => content.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  }, [deleteConfirm]);

  const handleSortByViews = () => {
    if (sortByViews === 'none') {
      setSortByViews('desc');
    } else if (sortByViews === 'desc') {
      setSortByViews('asc');
    } else {
      setSortByViews('none');
    }
    setCurrentPage(1);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatTotalViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K`;
    }
    return views.toString();
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/40 backdrop-blur-sm border border-border/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Movies</CardTitle>
            <Film className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalMovies}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur-sm border border-border/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Web Series</CardTitle>
            <Tv className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalSeries}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur-sm border border-border/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">TV Shows</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalShows}</div>
          </CardContent>
        </Card>

        <Card className="bg-card/40 backdrop-blur-sm border border-border/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatTotalViews(totalViews)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Library Table */}
      <Card className="bg-card/40 backdrop-blur-sm border border-border/30">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <CardTitle className="text-foreground">Content Library</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/30"
                />
              </div>
              <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background/50 border-border/30">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {contentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/30 bg-background/30 backdrop-blur-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 bg-primary/5 hover:bg-primary/10">
                  <TableHead className="text-muted-foreground font-semibold w-16">#</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Title</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Type</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Year</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Rating</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Genre</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">
                    <Button
                      variant="ghost"
                      onClick={handleSortByViews}
                      className="h-auto p-0 font-semibold text-muted-foreground hover:text-primary flex items-center gap-1"
                    >
                      Views
                      {sortByViews === 'none' && <ArrowUpDown className="h-3 w-3" />}
                      {sortByViews === 'desc' && <ArrowDown className="h-3 w-3" />}
                      {sortByViews === 'asc' && <ArrowUp className="h-3 w-3" />}
                    </Button>
                  </TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedContents.map((content, index) => (
                  <TableRow 
                    key={content.id} 
                    className="border-border/30 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <TableCell className="font-medium text-muted-foreground">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {content.title}
                    </TableCell>
                    <TableCell className="text-foreground">
                      <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                        {content.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">{content.releaseYear}</TableCell>
                    <TableCell className="text-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{content.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      <div className="flex flex-wrap gap-1">
                        {content.selectedGenres.slice(0, 2).map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs bg-secondary/50">
                            {genre}
                          </Badge>
                        ))}
                        {content.selectedGenres.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-secondary/50">
                            +{content.selectedGenres.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground font-medium">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-primary" />
                        <span>{formatViews(content.views)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(content)}
                          className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary transition-all duration-200 rounded-full group-hover:scale-110"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(content)}
                          className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive transition-all duration-200 rounded-full group-hover:scale-110"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 mt-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0 hover:bg-primary/20 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0 hover:bg-primary/20 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Content Dialog */}
      {editContent && (
        <EditContentDialog
          content={editContent}
          open={!!editContent}
          onClose={() => setEditContent(null)}
          onSave={handleEditSave}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-card/90 backdrop-blur-sm border border-border/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Content
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete "{deleteConfirm?.title}"? This action cannot be undone and will permanently remove this content from your library.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setDeleteConfirm(null)}
              className="bg-background/50 border-border/50 hover:bg-background/70"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete}
              className="bg-primary text-primary-foreground hover:bg-destructive hover:scale-105 transition-all duration-200"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageContentTab;
