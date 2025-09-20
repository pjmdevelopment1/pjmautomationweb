// src/app/blog/[slug]/ShareButton.tsx - CLIENT COMPONENT
"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  url: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = {
      title: title,
      url: `${window.location.origin}${url}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(shareData.url);
        // Simple alert - you could replace with a toast notification
        alert("Link copied to clipboard!");
      } catch (err) {
        console.log("Error copying to clipboard:", err);
        // Fallback: show URL in a prompt for manual copying
        prompt("Copy this link:", shareData.url);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-900 transition-colors"
      aria-label={`Share article: ${title}`}
    >
      <Share2 className="h-4 w-4" />
      <span>Share</span>
    </button>
  );
}
