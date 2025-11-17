import React, { createContext, useContext, useCallback, useState } from 'react';
import { fetchPhotos } from '../api/picsumApi';

const PhotosContext = createContext();

export function PhotosProvider({ children }) {
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState(null);

	const loadPage = useCallback(async (p) => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await fetchPhotos(p, 20);
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
	}, []);

	const loadNext = useCallback(() => {
		if (!isLoading && hasMore) setPage((p) => p + 1);
	}, [isLoading, hasMore]);

	React.useEffect(() => {
		loadPage(page);
	}, [page, loadPage]);

	const reset = useCallback(() => {
		setPhotos([]);
		setPage(1);
		setHasMore(true);
	}, []);

	return (
		<PhotosContext.Provider value={{ photos, isLoading, hasMore, error, loadNext, reset }}>
			{children}
		</PhotosContext.Provider>
	);
}

export function usePhotosContext() {
	return useContext(PhotosContext);
}
