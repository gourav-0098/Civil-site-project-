export default function VideoPlayer({ video, title = 'Project Video' }) {
  if (!video || !video.provider || video.provider === 'none') {
    return null;
  }

  const { provider, embedUrl, url } = video;

  // Validate allowed embed origins
  let safeEmbedUrl = null;

  if (provider === 'youtube') {
    const rawUrl = embedUrl || url;
    if (rawUrl) {
      try {
        const parsed = new URL(rawUrl);
        if (
          parsed.hostname === 'www.youtube.com' ||
          parsed.hostname === 'youtube.com' ||
          parsed.hostname === 'www.youtube-nocookie.com' ||
          parsed.hostname === 'youtu.be'
        ) {
          // Extract video ID safely
          let videoId = '';
          if (parsed.hostname === 'youtu.be') {
            videoId = parsed.pathname.slice(1);
          } else if (parsed.searchParams.has('v')) {
            videoId = parsed.searchParams.get('v');
          } else if (parsed.pathname.includes('/embed/')) {
            videoId = parsed.pathname.split('/embed/')[1];
          }

          if (videoId) {
            safeEmbedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
          }
        }
      } catch {
        // Invalid URL
      }
    }
  } else if (provider === 'vimeo') {
    const rawUrl = embedUrl || url;
    if (rawUrl) {
      try {
        const parsed = new URL(rawUrl);
        if (parsed.hostname.includes('vimeo.com')) {
          const segments = parsed.pathname.split('/').filter(Boolean);
          const vimeoId = segments[segments.length - 1];
          if (/^\d+$/.test(vimeoId)) {
            safeEmbedUrl = `https://player.vimeo.com/video/${vimeoId}`;
          }
        }
      } catch {
        // Invalid URL
      }
    }
  } else if (provider === 'cloudinary' && url) {
    // Direct HTML5 video for Cloudinary
    return (
      <div className="relative aspect-video w-full bg-navy-950 overflow-hidden border border-steel-200">
        <video
          controls
          className="w-full h-full object-cover"
          preload="metadata"
          title={title}
        >
          <source src={url} type="video/mp4" />
          Your browser does not support HTML5 video streaming.
        </video>
      </div>
    );
  }

  if (!safeEmbedUrl) {
    return null;
  }

  return (
    <div className="relative aspect-video w-full bg-navy-950 overflow-hidden border border-steel-200 shadow-md">
      <iframe
        src={safeEmbedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-0"
        loading="lazy"
      />
    </div>
  );
}
