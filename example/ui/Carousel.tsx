import React, { useRef } from 'react'
import Stack from '../../src/Stack'
import Box from '../../src/Box'
import Carousel from '../../src/Carousel'
import Button from '../../src/Button'
import Image from '../../src/Image'
import Section from '../Layout/Section'


const dummyImages = [
    {
        id: 1,
        title: "Mountain View",
        url: "https://picsum.photos/id/1015/600/400",
    },
    {
        id: 2,
        title: "City Skyline",
        url: "https://picsum.photos/id/1016/600/400",
    },
    {
        id: 3,
        title: "Forest Path",
        url: "https://picsum.photos/id/1018/600/400",
    },
    {
        id: 4,
        title: "Beach Sunset",
        url: "https://picsum.photos/id/1025/600/400",
    },
    {
        id: 5,
        title: "Snowy Mountains",
        url: "https://picsum.photos/id/1031/600/400",
    },
    {
        id: 6,
        title: "Desert Dunes",
        url: "https://picsum.photos/id/1035/600/400",
    },
    {
        id: 7,
        title: "Lake View",
        url: "https://picsum.photos/id/1043/600/400",
    },
    {
        id: 8,
        title: "Green Hills",
        url: "https://picsum.photos/id/1050/600/400",
    },
    {
        id: 9,
        title: "Green Hills",
        url: "https://picsum.photos/id/1051/600/400",
    },
    {
        id: 10,
        title: "Green Hills",
        url: "https://picsum.photos/id/1052/600/400",
    },
];



const Carousels = () => {
    const ref = useRef<any>(null)
    return (
        <Stack
        >
            <Section
                title="Basic"
                flexRow
                gap={2}
            >
                <Carousel >
                    {
                        dummyImages.map((img, i) => (
                            <Box
                                key={img.id}
                                height={300}
                                width={"100%"}
                                overflow={"hidden"}
                                radius={2}
                                bgcolor="background.secondary">
                                <Image
                                    src={img.url}
                                    alt={""}
                                />
                            </Box>
                        ))
                    }
                </Carousel>

            </Section>
            <Button
                onClick={() => {
                    ref.current?.next()
                }}
            >Next</Button>
            <Button
                onClick={() => {
                    ref.current?.prev()
                }}
            >prev</Button>
        </Stack>
    )
}

export default Carousels