// Prefix a root-relative path with the configured base (e.g. /nullwave on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const href = (path: string) => base + path;

// Strip the base back off, for comparing against root-relative paths.
export const unbase = (path: string) => path.slice(base.length) || '/';
