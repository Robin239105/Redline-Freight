import { useEffect } from "react";

/**
 * useDocumentMetadata — updates the tab title and page meta description dynamically.
 * Helps with SEO inside a single page application (SPA).
 */
export function useDocumentMetadata(title: string, description: string) {
  useEffect(() => {
    // Save previous metadata
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : "";

    // Set new metadata
    document.title = `${title} — Redline Freight Co.`;
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }

    // Restore on unmount
    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute("content", prevDesc);
      }
    };
  }, [title, description]);
}
