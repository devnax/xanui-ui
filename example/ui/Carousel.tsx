import React, { useRef, useState } from 'react'
import Stack from '../../src/Stack'
import Box from '../../src/Box'
import Carousel, { CarouselRef } from '../../src/Carousel'
import Button from '../../src/Button'
import Image from '../../src/Image'
import Section from '../Layout/Section'
import { Transition } from '@xanui/core'


const dummyImages = [
    {
        id: 1015,
        url: "https://picsum.photos/id/1015/600/400",
    },
    {
        id: 1016,
        url: "https://picsum.photos/id/1016/600/400",
    },
    {
        id: 1018,
        url: "https://picsum.photos/id/1018/600/400",
    },
    {
        id: 1020,
        url: "https://picsum.photos/id/1020/600/400",
    },
    {
        id: 1025,
        url: "https://picsum.photos/id/1025/600/400",
    },
    {
        id: 1031,
        url: "https://picsum.photos/id/1031/600/400",
    },
    {
        id: 1035,
        url: "https://picsum.photos/id/1035/600/400",
    },
    {
        id: 1043,
        url: "https://picsum.photos/id/1043/600/400",
    },
    {
        id: 1050,
        url: "https://picsum.photos/id/1050/600/400",
    },
    {
        id: 1051,
        url: "https://picsum.photos/id/1051/600/400",
    },
    {
        id: 1052,
        url: "https://picsum.photos/id/1052/600/400",
    },
];


const Carousels = () => {
    const ref = useRef<CarouselRef>(null)
    const [childs, setChilds] = useState(dummyImages)
    const [index, setIndex] = useState<number[]>([0])

    return (
        <Stack
        >
            {/* <CarouselC /> */}
            <Section
                title="Basic"
                flexRow
                gap={2}
            >
                <Carousel
                    ref={ref}
                    duration={500}
                    slidesToShow={3}
                    // autoplay
                    onChange={(idx, indexes) => {
                        setIndex(indexes)
                    }}
                >
                    {
                        childs.map((img, i) => (
                            <Box
                                key={img.id}
                                width={"100%"}
                                overflow={"hidden"}
                                radius={2}
                                bgcolor="surface.light"
                            >
                                <Image
                                    src={img.url}
                                    alt={""}
                                />
                            </Box>
                        ))
                    }
                </Carousel>
            </Section>
            <Stack
                flexRow
                gap={1}
                p={1}
            >
                {
                    childs.map((img, i) => (
                        <Box
                            key={img.id}
                            width={50}
                            radius={1}
                            overflow={"hidden"}
                            border={index.includes(i) ? "2px solid" : "1px solid"}
                            borderColor={index.includes(i) ? "primary" : "surface.light"}
                            onClick={() => {
                                ref.current?.goTo(i)
                            }}
                        >
                            <Image
                                src={img.url}
                                alt={""}
                            />
                        </Box>
                    ))
                }
            </Stack>
            <Stack
                flexRow
                gap={2}
                p={1}
            >
                <Button
                    onClick={() => {
                        ref.current?.prev()
                    }}
                >Prev</Button>
                <Button
                    onClick={() => {
                        ref.current?.next()
                    }}
                >Next</Button>
            </Stack>
            <Button
                onClick={() => {
                    const last = childs[childs.length - 1]
                    setChilds(p => [...p, {
                        id: last.id + 1,
                        url: `https://picsum.photos/id/${last.id + 1}/600/400`,

                    }])
                }}
            >Add</Button>
            {/* <Button
                onClick={() => {
                    ref.current?.next()
                }}
            >Next</Button>
            <Button
                onClick={() => {
                    ref.current?.prev()
                }}
            >prev</Button> */}
        </Stack>
    )
}

export default Carousels