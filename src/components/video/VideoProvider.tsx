"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { VideoModal, type VideoInfo } from "./VideoModal";

/** Un seul lecteur pour tout le site : n'importe quelle section peut ouvrir une vidéo. */
const Ctx = createContext<(v: VideoInfo) => void>(() => {});

export function VideoProvider({ children }: { children: ReactNode }) {
  const [video, setVideo] = useState<VideoInfo | null>(null);
  const fermer = useCallback(() => setVideo(null), []);
  return (
    <Ctx.Provider value={setVideo}>
      {children}
      <VideoModal moment={video} onClose={fermer} />
    </Ctx.Provider>
  );
}

export const useVideo = () => useContext(Ctx);
