import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

export default function PanoramaView({ pano, panos, setCurrent }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  const prevPano = panos.find((p) => p.id === pano.id - 1);
  const nextPano = panos.find((p) => p.id === pano.id + 1);

  useEffect(() => {
    if (!containerRef.current) return;

    // Crear viewer
    if (!viewerRef.current) {
      viewerRef.current = new Viewer({
        container: containerRef.current,
        panorama: pano.image,
        navbar: false,
        defaultLat: 0,
        defaultLon: 0,
        defaultZoomLvl: 0,
        transitionDuration: 0
      });
    } else {
      viewerRef.current.setPanorama(pano.image, { transition: false });
    }
  }, [pano, panos, setCurrent, nextPano, prevPano]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          background: "black"
        }}
      >
        <style>{`.psv-loader { display: none !important; }`}</style>
      </div>

      {/* Botones mínimos a los lados */}
      <button
        onClick={() => prevPano && setCurrent(prevPano)}
        disabled={!prevPano}
        style={{
          position: "absolute",
          left: 15,
          top: "50%",
          transform: "translateY(-50%)",
          background: prevPano ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)",
          color: "white",
          border: "none",
          padding: "10px 15px",
          fontSize: "18px",
          cursor: prevPano ? "pointer" : "default",
          zIndex: 100,
          borderRadius: "4px",
          opacity: prevPano ? 0.7 : 0.3,
          pointerEvents: "auto"
        }}
      >
        ◀
      </button>

      <button
        onClick={() => nextPano && setCurrent(nextPano)}
        disabled={!nextPano}
        style={{
          position: "absolute",
          right: 15,
          top: "50%",
          transform: "translateY(-50%)",
          background: nextPano ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)",
          color: "white",
          border: "none",
          padding: "10px 15px",
          fontSize: "18px",
          cursor: nextPano ? "pointer" : "default",
          zIndex: 100,
          borderRadius: "4px",
          opacity: nextPano ? 0.7 : 0.3,
          pointerEvents: "auto"
        }}
      >
        ▶
      </button>
    </div>
  );
}
