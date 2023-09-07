import React, { useRef, useEffect } from "react";

export interface InfiniteLoaderProps {
  children: React.ReactElement;
  threshold?: `${string}px`;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export const InfiniteLoader = ({
  children,
  threshold = "500px",
  hasMore,
  isLoading,
  onLoadMore,
}: InfiniteLoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      {
        rootMargin: `0px 0px ${threshold} 0px`,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, threshold, onLoadMore]);

  return (
    <>
      {children}
      {hasMore && <div ref={loaderRef} />}
    </>
  );
};
