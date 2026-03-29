import Box from '../Box';
import Button from '../Button';
import Stack from '../Stack';
import { Children, ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react'


type AnimateOptions = {
    from: number;
    to: number;
    duration: number;
    onUpdate: Function
    onDone: Function
}

const animate = ({ from, to, duration = 400, onUpdate, onDone }: AnimateOptions) => {
    const start = performance.now();

    const frame = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);

        // ease-out cubic (same feel as your bezier)
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = from + (to - from) * eased;

        onUpdate(value);

        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            onDone?.();
        }
    };

    requestAnimationFrame(frame);
};

const infinityChunk = (page: number, perpage: number, total: number) => {
    if (total <= 0 || perpage <= 0) return [];

    const result: number[] = [];
    let start = (page * perpage) % total;
    if (start < 0) start += total;

    for (let i = 0; i < perpage; i++) {
        result.push((start + i) % total);
    }

    return result;
};

export type Props = {
    children: ReactNode;
    slidesToShow?: number
}

const Carousel = ({ children, slidesToShow = 4 }: Props) => {

    const childs = Children.toArray(children)
    const [page, setPage] = useState(0)
    const track = useRef<HTMLElement>(null)
    const pages = useMemo(() => {
        const pages: any = []
        let i = 0
        while (true) {
            const page = infinityChunk(i, slidesToShow, childs.length)
            i++;
            if (pages.length && pages[0].toString() === page.toString()) {
                break
            }
            pages.push(page)
        }
        pages.push(infinityChunk(pages.length, slidesToShow, childs.length))
        return pages as number[][]
    }, [childs.length, slidesToShow])
    console.log(childs.length, pages);


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
                    pages.map(((items) => {
                        return items.map((i, idx) => {
                            return (
                                <Box
                                    key={`n${idx}${i}`}
                                    width={`${100 / slidesToShow}%`}
                                    flexShrink={0}
                                    p={1}
                                    data-index={i}
                                >
                                    {childs[i]}
                                </Box>
                            )
                        })
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
                        const ele = track.current as HTMLElement
                        if (page <= 0) {
                            const nextpage = pages.length - 1
                            setPage(nextpage)
                            ele.style.transform = `translate3d(-${nextpage * 100}%, 0, 0)`
                            ele.style.transition = `none`

                            requestAnimationFrame(() => {
                                const _nextpage = nextpage - 1
                                const translate = (_nextpage * 100)
                                setPage(_nextpage)
                                ele.style.transition = `transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)`
                                ele.style.transform = `translate3d(-${translate}%, 0, 0)`
                            })
                        } else {

                            const nextpage = page - 1
                            const translate = (nextpage * 100)
                            setPage(nextpage)
                            ele.style.transition = `transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)`
                            ele.style.transform = `translate3d(-${translate}%, 0, 0)`
                        }
                    }}
                >Prev</Button>
                <Button
                    onClick={() => {
                        const ele = track.current as HTMLElement
                        if (page >= pages.length - 1) {
                            setPage(0)
                            ele.style.transform = `translate3d(-${0 * 100}%, 0, 0)`
                            ele.style.transition = `none`
                            requestAnimationFrame(() => {
                                const nextpage = 1
                                const translate = (nextpage * 100)
                                setPage(nextpage)
                                ele.style.transition = `transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)`
                                ele.style.transform = `translate3d(-${translate}%, 0, 0)`
                            })
                        } else {

                            const nextpage = page + 1
                            const translate = (nextpage * 100)
                            setPage(nextpage)
                            ele.style.transition = `transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)`
                            ele.style.transform = `translate3d(-${translate}%, 0, 0)`
                        }

                    }}
                >Next</Button>
            </Stack>
        </Box>
    )
}

export default Carousel