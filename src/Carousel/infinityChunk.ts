
const infinityChunkByScroll = (
   page: number,
   slidesToShow: number,
   slidesToScroll: number,
   total: number
) => {
   if (total <= 0 || slidesToShow <= 0 || slidesToScroll <= 0) {
      return { current: [], oldItems: [], newItems: [] };
   }

   const getChunk = (p: number) => {
      let start = (p * slidesToScroll) % total;
      if (start < 0) start += total;

      const arr: number[] = [];
      for (let i = 0; i < slidesToShow; i++) {
         arr.push((start + i) % total);
      }
      return arr;
   };

   const current = getChunk(page);
   const prev = getChunk(page - 1);

   // entering items
   const newItems = current.filter(i => !prev.includes(i)) as number[]

   // remaining items (not new)
   const oldItems = current.filter(i => !newItems.includes(i)) as number[]

   return { current, oldItems, newItems };
};


export default infinityChunkByScroll;

export const infinityChunkWithTransform = (
   page: number,
   slidesToShow: number,
   slidesToScroll: number,
   total: number
) => {
   if (total <= 0 || slidesToShow <= 0 || slidesToScroll <= 0) {
      return [];
   }

   const getStart = (p: number) => {
      let start = (p * slidesToScroll) % total;
      if (start < 0) start += total;
      return start;
   };

   const getChunk = (p: number) => {
      const start = getStart(p);

      const arr: number[] = [];
      for (let i = 0; i < slidesToShow; i++) {
         arr.push((start + i) % total);
      }
      return arr;
   };

   const current = getChunk(page);
   const prev = getChunk(page - 1);

   const itemWidth = 100 / slidesToShow;
   const baseOffset = page * slidesToScroll;

   const start = getStart(page);
   const prevStart = getStart(page - 1);

   // direction detection
   const isNext = page > page - 1; // always true in this context, but keeping explicit intent
   const isForward = page >= 0 ? page >= (page - 1) : true;

   const items = current.map((itemIndex, i) => {
      const slot = baseOffset + i;

      // 🔥 boundary detection
      let isBoundary = false;

      if (page > page - 1) {
         // moving forward
         isBoundary = itemIndex < start;
      } else {
         // moving backward
         isBoundary = itemIndex > start;
      }

      return {
         index: itemIndex,
         translateX: `${slot * itemWidth}%`,
         isNew: !prev.includes(itemIndex),
         isBoundary, // ✅ NEW FIELD
      };
   });

   return items
};