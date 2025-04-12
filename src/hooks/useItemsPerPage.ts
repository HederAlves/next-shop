import { useEffect, useState } from "react";

export const useItemsPerPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const mediaQueries = [
      { query: "(min-width: 1024px)", value: 4 },
      { query: "(min-width: 768px)", value: 3 },
      { query: "(min-width: 640px)", value: 2 },
    ];

    const updateItemsPerPage = () => {
      for (const mq of mediaQueries) {
        if (window.matchMedia(mq.query).matches) {
          setItemsPerPage(mq.value);
          return;
        }
      }
      setItemsPerPage(1);
    };

    updateItemsPerPage();

    const handlers = mediaQueries.map((mq) => {
      const media = window.matchMedia(mq.query);
      const listener = () => updateItemsPerPage();
      media.addEventListener("change", listener);
      return { media, listener };
    });

    return () => {
      handlers.forEach(({ media, listener }) =>
        media.removeEventListener("change", listener)
      );
    };
  }, []);

  return itemsPerPage;
};
