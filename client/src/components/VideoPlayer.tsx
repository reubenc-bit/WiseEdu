import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  className?: string;
  "data-testid"?: string;
}

export function VideoPlayer({ 
  title, 
  description, 
  duration, 
  videoUrl, 
  thumbnailUrl,
  className = "",
  "data-testid": testId
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoUrl && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Use sample educational videos if no URL provided
      const sampleVideo = getSampleVideo(title);
      if (sampleVideo && videoRef.current) {
        videoRef.current.src = sampleVideo;
        setShowVideo(true);
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const getSampleVideo = (title: string) => {
    // Educational videos that work for demonstration
    const sampleVideos = [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    ];
    
    // Use title hash to consistently assign same video to same title
    const hash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return sampleVideos[Math.abs(hash) % sampleVideos.length];
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <Card className={`feature-card hover-elevate ${className}`} data-testid={testId}>
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden rounded-t-lg">
        {/* Show actual video if URL provided and video is playing */}
        {(videoUrl || showVideo) ? (
          <video 
            ref={videoRef}
            src={videoUrl || getSampleVideo(title)}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls={false}
            muted={isMuted}
            poster={thumbnailUrl}
          />
        ) : thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Play className="w-10 h-10 text-white" />
            </div>
            <p className="text-white/80 text-sm">Click to Watch</p>
          </div>
        )}
        
        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
              onClick={handlePlay}
              data-testid="button-play-video"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </Button>
            
            {videoUrl && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white"
                onClick={toggleMute}
                data-testid="button-mute-video"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
          {duration}
        </div>
        
        {/* Educational content indicator */}
        {!videoUrl && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
            SAMPLE
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2" data-testid="text-video-title">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4" data-testid="text-video-description">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Duration: {duration}</span>
          {!videoUrl && (
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Educational Sample</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
