import Box from '../Box';
import Button from '../Button';
import Stack from '../Stack';
import { Children, ReactNode, useRef, useState } from 'react'


type AnimateOptions = {
    from: number;
    to: number;
    duration: number;
    onUpdate: Function
}
const animate = ({ from, to, duration = 400, onUpdate, onDone }) => {
    const start = performance.now();

    const frame = (now) => {
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

const Carousel = ({ children, slidesToShow = 3 }: Props) => {

    const childs = Children.toArray(children)
    const [page, setPage] = useState(0)
    const [animating, setAnimating] = useState(false)
    const currentIndexes = infinityChunk(page, slidesToShow, childs.length)
    const prevIndexes = infinityChunk(page - 1, slidesToShow, childs.length)
    const nextIndexes = infinityChunk(page + 1, slidesToShow, childs.length)
    const activeIndex = currentIndexes[currentIndexes.length - 1]
    const track = useRef<HTMLElement>(null)

    const [view, setView] = useState(slidesToShow)
    const translate = (view * 100) / slidesToShow;

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
                    transition: animating
                        ? "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
                        : "none",
                    transform: `translate3d(-${translate}%, 0, 0)`,
                    willChange: "transform"
                }}
            >
                {
                    prevIndexes.map(i => {
                        return (
                            <Box
                                key={`p${i}`}
                                width={`${100 / slidesToShow}%`}
                                flexShrink={0}
                                p={1}
                            >
                                {childs[i]}
                            </Box>
                        )
                    })
                }
                {
                    currentIndexes.map(i => {
                        return (
                            <Box
                                key={`c${i}`}
                                width={`${100 / slidesToShow}%`}
                                flexShrink={0}
                                p={1}
                            >
                                {childs[i]}
                            </Box>
                        )
                    })
                }
                {
                    nextIndexes.map(i => {
                        return (
                            <Box
                                key={`n${i}`}
                                width={`${100 / slidesToShow}%`}
                                flexShrink={0}
                                p={1}
                            >
                                {childs[i]}
                            </Box>
                        )
                    })
                }
            </Stack>
            <Stack
                flexRow
                gap={2}
                p={1}
            >
                <Button
                    onClick={() => {
                        if (animating) return
                        setAnimating(true)
                        setView(0)
                        if (track.current) {
                            track.current.ontransitionend = () => {
                                setAnimating(false)
                                setView(slidesToShow)
                                setPage(page - 1)
                            }
                        }
                    }}
                >Prev</Button>
                <Button
                    onClick={() => {
                        if (animating) return
                        setAnimating(true)
                        setView(slidesToShow * 2)
                        if (track.current) {
                            track.current.ontransitionend = () => {
                                setAnimating(false)
                                setView(slidesToShow)
                                setPage(page + 1)
                            }
                        }
                    }}
                >Next</Button>
            </Stack>
        </Box>
    )
}

export default Carousel