import { useEffect, useState } from "react";

/**
 * Fetches a resource from the live backend API and falls back to bundled
 * static/placeholder data if the request fails (backend not running yet,
 * no network, empty collection, etc). This is what lets the public site
 * "just work" with zero setup while still reflecting real admin/MongoDB
 * content the moment it exists.
 *
 * @param {() => Promise<{ data: any }>} fetcher - an axios call, e.g. servicesApi.list
 * @param {any} fallbackData - static data to use if the fetch fails or returns empty
 */
export function useApiWithFallback(fetcher, fallbackData) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetcher()
      .then((res) => {
        if (!mounted) return;
        const result = res.data;
        if (Array.isArray(result) && result.length === 0) {
          // Backend reachable but no content yet — keep placeholder data.
          setData(fallbackData);
          setUsingFallback(true);
        } else {
          setData(result);
          setUsingFallback(false);
        }
      })
      .catch(() => {
        if (!mounted) return;
        setData(fallbackData);
        setUsingFallback(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, usingFallback };
}
