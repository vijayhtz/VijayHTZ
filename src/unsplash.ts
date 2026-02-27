import { createApi } from 'unsplash-js';

// Get the Access Key from Vite environment variables
const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '';

export const unsplash = createApi({
    accessKey: accessKey,
});
