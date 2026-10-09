import React, { useEffect, useState } from 'react';
import { ExternalLink, LoaderCircle, PlayCircle, Search } from 'lucide-react';
import { searchYouTubeResources, type YouTubeVideo } from '../../services/apiService';

interface VideoResourcesPanelProps {
  topic: string;
  lessonTitle: string;
}

export const VideoResourcesPanel: React.FC<VideoResourcesPanelProps> = ({ topic, lessonTitle }) => {
  const initialQuery = `${lessonTitle} ${topic}`.trim();
  const [query, setQuery] = useState(initialQuery);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadResources = async (searchTerm: string) => {
    setLoading(true);
    setError('');
    try {
      const result = await searchYouTubeResources(searchTerm);
      setConfigured(result.configured);
      setVideos(result.items);
      setSelectedVideo(result.items[0] || null);
    } catch (searchError) {
      setVideos([]);
      setSelectedVideo(null);
      setError(searchError instanceof Error ? searchError.message : 'Could not load YouTube resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadResources(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) void loadResources(query.trim());
  };

  const fallbackUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query.trim() || initialQuery)}`;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
          <PlayCircle className="h-4 w-4 text-red-500" /> Video resources
        </h3>
        <span className="text-[10px] font-semibold text-slate-500">YouTube</span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-b border-slate-200 p-3">
        <input
          aria-label="Search learning videos"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
        <button
          type="submit"
          aria-label="Search YouTube videos"
          disabled={loading || !query.trim()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </button>
      </form>

      <div className="space-y-2 p-3">
        {loading && <p className="text-xs text-slate-500">Finding videos for this lesson...</p>}
        {!loading && !configured && (
          <p className="text-xs leading-5 text-slate-500">Add a YouTube API key to the backend to load video recommendations.</p>
        )}
        {!loading && error && <p role="alert" className="text-xs leading-5 text-rose-600">{error}</p>}
        {!loading && configured && !error && videos.length === 0 && (
          <p className="text-xs text-slate-500">No videos found for this search.</p>
        )}

        {selectedVideo && !loading && (
          <div className="space-y-2 pb-2">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(selectedVideo.id)}`}
              title={selectedVideo.title}
              className="aspect-video w-full rounded-lg bg-slate-950"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <p className="line-clamp-2 text-xs font-bold text-slate-800">{selectedVideo.title}</p>
          </div>
        )}

        {videos.map((video) => (
          <div
            key={video.id}
            className={`group flex gap-2 rounded-lg p-2 transition ${selectedVideo?.id === video.id ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}
          >
            <button
              type="button"
              onClick={() => setSelectedVideo(video)}
              aria-label={`Play ${video.title} in Studio`}
              className="flex min-w-0 flex-1 gap-3 text-left focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              {video.thumbnailUrl ? (
                <img src={video.thumbnailUrl} alt="" className="h-14 w-24 shrink-0 rounded-md object-cover" />
              ) : (
                <span className="flex h-14 w-24 shrink-0 items-center justify-center rounded-md bg-slate-100 text-red-500">
                  <PlayCircle className="h-6 w-6" />
                </span>
              )}
              <span className="min-w-0 self-center">
                <span className="line-clamp-2 block text-xs font-bold text-slate-800 group-hover:text-indigo-700">{video.title}</span>
                <span className="mt-1 block truncate text-[10px] text-slate-500">{video.channelTitle}</span>
              </span>
            </button>
            <a
              href={`https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${video.title} on YouTube`}
              className="mt-1 h-fit shrink-0 text-slate-400 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}

        {!loading && (!configured || error || videos.length === 0) && (
          <a href={fallbackUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800">
            Browse YouTube search results <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </section>
  );
};