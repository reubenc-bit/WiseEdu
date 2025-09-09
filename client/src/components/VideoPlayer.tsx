import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  className?: string;
}

export function VideoPlayer({ 
  title, 
  description, 
  duration, 
  videoUrl, 
  thumbnailUrl,
  className = "" 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoUrl) {
      // TODO: Implement actual video playback
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className={`feature-card ${className}`} data-testid="video-player">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden rounded-t-lg">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-16 h-16 rounded-full bg-primary/20 hover:bg-primary/30"
              onClick={handlePlay}
              data-testid="button-play-video"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-primary" />
              ) : (
                <Play className="w-8 h-8 text-primary" />
              )}
            </Button>
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
          {duration}
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2" data-testid="text-video-title">
          {title}
        </h3>
        <p className="text-muted-foreground" data-testid="text-video-description">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
