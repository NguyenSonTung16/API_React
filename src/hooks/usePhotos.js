// Local hook that fetches paginated photo lists without context.
import { useCallback, useEffect, useState } from 'react';
import { fetchPhotos } from '../api/picsumApi';

export default function usePhotos(initialPage = 1, limit = 20) {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadPage = useCallback(async (p) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPhotos(p, limit);
      if (!data || data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prev) => [...prev, ...data]);
      }
    } catch (err) {
      setError(err.message || 'Error fetching photos');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadPage(page);
  }, [page, loadPage]);

  const loadNext = useCallback(() => {
    if (!isLoading && hasMore) setPage((p) => p + 1);
  }, [isLoading, hasMore]);

  return { photos, isLoading, hasMore, error, loadNext, reset: () => { setPhotos([]); setPage(1); setHasMore(true); } };
}
