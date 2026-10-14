import { useEffect, useRef, useState } from "react";

type ViewerFrameProps = {
  title: string;
  embedUrl?: string | undefined;
  embedHtml?: string | undefined;
  emptyTitle?: string | undefined;
  emptyBody?: string | undefined;
};

// Wraps an embed in a container that can be expanded to true fullscreen
// via the browser Fullscreen API (needed because Spline embeds have no
// fullscreen control of their own).
export function ViewerFrame({ title, embedUrl, embedHtml, emptyTitle = "3D viewer", emptyBody }: ViewerFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (!frameRef.current) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void frameRef.current.requestFullscreen();
    }
  };

  const hasEmbed = Boolean(embedUrl || embedHtml);

  return (
    <div
      ref={frameRef}
      className="viewer-frame relative aspect-[16/10] w-full rounded-xl border border-border bg-card overflow-hidden signal-grid"
    >
      {embedUrl ? (
        <iframe src={embedUrl} title={`${title} 3D model`} className="absolute inset-0 h-full w-full border-0" allowFullScreen />
      ) : embedHtml ? (
        <div className="absolute inset-0 [&_iframe]:h-full [&_iframe]:w-full" dangerouslySetInnerHTML={{ __html: embedHtml }} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <p className="font-display text-xl">{emptyTitle}</p>
          {emptyBody ? <p className="text-muted-foreground text-sm mt-2 max-w-sm">{emptyBody}</p> : null}
        </div>
      )}
      {hasEmbed && (
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-md border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
        >
          {isFullscreen ? "Exit fullscreen" : "View fullscreen"}
        </button>
      )}
    </div>
  );
}
