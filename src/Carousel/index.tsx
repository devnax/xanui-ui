import { animate } from '@xanui/core';
import Box from '../Box';
import Button from '../Button';
import Stack from '../Stack';
import { Children, ReactNode, useRef, useState } from 'react'
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

export type Props = {
    children: ReactNode;
    slidesToShow?: number
    slidesToScroll?: number
}

const Carousel = ({ children, slidesToShow = 3, slidesToScroll = 1 }: Props) => {

    const childs = Children.toArray(children)
    const childsRefs = useRef<(HTMLDivElement | null)[]>([]);
    const total = childs.length
    const [index, setIndex] = useState(slidesToShow)
    const [page, setPage] = useState(0)
    const track = useRef<HTMLElement>(null)


    const state = useRef({ x: 0 })
    const animating = useRef(() => { })

    const prev = () => {

    }

    const bps = useRef<any>([])
    const next = () => {
        const trackEle = track.current as HTMLElement
        const nextPage = page + 1
        const chunk = infinityChunkByScroll(nextPage, slidesToShow, slidesToScroll, total)
        setPage(nextPage)

        const oldLastitem = chunk.old[chunk.old.length - 1]
        const newFirstItem = chunk.new[0]
        const itemWidth = 100 / slidesToShow
        const to = (nextPage * slidesToScroll) * itemWidth

        if (oldLastitem > newFirstItem) {
            // move new slide to last
            const item = childsRefs.current[newFirstItem] as HTMLElement
            const to = (total * itemWidth * slidesToShow) + (newFirstItem * itemWidth)
            item.style.transform = `translateX(${to}%)`
        } else {
        }

        console.log(oldLastitem, newFirstItem);


        animating.current()
        animating.current = animate({
            duration: 1000,
            from: {
                x: state.current.x
            },
            to: {
                x: to
            },
            onUpdate: ({ x }) => {
                state.current.x = x

                trackEle.style.transform = `translateX(-${x}%)`
            },
            breakpoints: {
                x: bps.current
            },
            onDone: () => {
                bps.current = []
            }
        })

        return


        // const nextIndex = index + slidesToScroll
        // setIndex(nextIndex)

        // 


        // bps.current.push({
        //     value: state.current.x + .1,
        //     callback: () => {
        //         // console.log("itemIndex", index);
        //         const currentRect = childsRefs.current[index]?.getBoundingClientRect()
        //         const nextRect = childsRefs.current[index + 1]?.getBoundingClientRect()
        //         if (!nextRect) {
        //             console.log("yes");

        //         }

        //     }
        // })


        // for (let i = 1; i <= slidesToScroll; i++) {
        //     const itemIndex = index + i
        //     const _to = (itemIndex - slidesToShow) * itemWidth
        //     bps.current.push({
        //         value: _to,
        //         callback: () => {
        //             // console.log("itemIndex", itemIndex);
        //             const currentRect = childsRefs.current[itemIndex]?.getBoundingClientRect()
        //             const nextRect = childsRefs.current[itemIndex + 1]?.getBoundingClientRect()
        //             if (!nextRect?.left) {
        //                 console.log("yes inner");

        //             }

        //         }
        //     })
        // }



        // animating.current()
        // animating.current = animate({
        //     duration: 2000,
        //     from: {
        //         x: state.current.x
        //     },
        //     to: {
        //         x: to
        //     },
        //     onUpdate: ({ x }) => {
        //         state.current.x = x

        //         trackEle.style.transform = `translateX(-${x}%)`
        //     },
        //     breakpoints: {
        //         x: bps.current
        //     },
        //     onDone: () => {
        //         bps.current = []
        //     }
        // })

    }

    return (
        <Box
            sx={{
                width: "100%",
                overflow: "hidden",
                cursor: "grab",
                touchAction: "pan-y",
                position: "relative",
            }}
        >
            <Stack
                flexRow
                ref={track}
                sx={{
                    display: "flex",
                    willChange: "transform"
                }}
            >
                {
                    childs.map(((child, i) => {
                        return (
                            <Box
                                key={`n${i}`}
                                ref={(el) => (childsRefs.current[i] = el)}
                                width={`${100 / slidesToShow}%`}
                                flexShrink={0}
                                p={1}
                                data-index={i}
                            >
                                {child}
                            </Box>
                        )
                    }))
                }
            </Stack>
            <Stack
                flexRow
                gap={2}
                p={1}
            >
                <Button
                    onClick={() => {
                        prev()
                    }}
                >Prev</Button>
                <Button
                    onClick={() => {
                        next()
                    }}
                >Next</Button>
            </Stack>
        </Box>
    )
}

export default Carousel