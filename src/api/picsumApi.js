// Small wrapper around the Picsum HTTP endpoints.
const BASE = 'https://picsum.photos';

export async function fetchPhotos(page = 1, limit = 20) {
  try {
    const res = await fetch(`${BASE}/v2/list?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchPhotoDetails(id) {
  try {
    const res = await fetch(`${BASE}/id/${id}/info`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

const picsumApi = {
  fetchPhotos,
  fetchPhotoDetails,
};

export default picsumApi;
