
const infinityChunkByScroll = (
   page: number,
   slidesToShow: number,
   slidesToScroll: number,
   total: number
) => {
   if (total <= 0 || slidesToShow <= 0 || slidesToScroll <= 0) {
      return { current: [], old: [], new: [] };
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

   return { current, old: oldItems, new: newItems };
};
