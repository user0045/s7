
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageCircle, Search, Calendar, Loader2, Globe } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useContentDemands } from '@/hooks/useContentDemands';

const DemandsTab = () => {
  const { data: requests, isLoading, error } = useContentDemands();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredRequests = requests ? requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.content_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (request.description && request.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDate = !dateFilter || 
                       request.date === dateFilter;
    
    return matchesSearch && matchesDate;
  }) : [];

  const truncateDescription = (description: string | null, maxLength: number = 50) => {
    if (!description) return 'No description provided';
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...'
      : description;
  };

  if (isLoading) {
    return (
      <Card className="bg-card/40 backdrop-blur-sm border border-border/30">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card/40 backdrop-blur-sm border border-border/30">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-foreground">Error loading content requests. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/40 backdrop-blur-sm border border-border/30">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-foreground">User Content Requests</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage and respond to user content suggestions and demands.
        </p>
        
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary w-48"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border/30 bg-background/20">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-muted/20">
                <TableHead className="text-foreground font-medium">Content Title</TableHead>
                <TableHead className="text-foreground font-medium">Type</TableHead>
                <TableHead className="text-foreground font-medium">Requested Date</TableHead>
                <TableHead className="text-foreground font-medium">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id} className="border-border/30 hover:bg-muted/20">
                    <TableCell className="font-medium text-foreground">
                      {request.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {request.content_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {request.date ? new Date(request.date).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="max-w-xs truncate">
                          {truncateDescription(request.description)}
                        </span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs bg-transparent hover:bg-dark-green/20 text-muted-foreground hover:text-primary border-0 text-dark-green hover:text-primary"
                            >
                              See More
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-card/95 backdrop-blur-sm border border-border/30">
                            <DialogHeader>
                              <DialogTitle className="text-foreground">{request.title}</DialogTitle>
                              <DialogDescription className="text-muted-foreground">
                                Full details of the content request
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-foreground">Type:</p>
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 mt-1">
                                    {request.content_type}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">Requested Date:</p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {request.date ? new Date(request.date).toLocaleDateString() : 'N/A'}
                                  </p>
                                </div>
                              </div>
                              
                              {request.user_ip && (
                                <div>
                                  <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    User IP Address:
                                  </p>
                                  <p className="text-sm text-muted-foreground font-mono bg-background/50 px-2 py-1 rounded">
                                    {request.user_ip}
                                  </p>
                                </div>
                              )}
                              
                              <div>
                                <p className="text-sm font-medium text-foreground mb-2">Description:</p>
                                <p className="text-foreground leading-relaxed">
                                  {request.description || 'No description provided'}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No content requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredRequests.length} of {requests?.length || 0} requests
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandsTab;
