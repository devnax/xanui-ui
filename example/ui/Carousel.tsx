import React, { useRef, useState } from 'react'
import Stack from '../../src/Stack'
import Box from '../../src/Box'
import Carousel from '../../src/Carousel'
import Button from '../../src/Button'
import Image from '../../src/Image'
import Section from '../Layout/Section'


const dummyImages = [
    {
        id: 1015,
        // url: "https://picsum.photos/id/1015/600/400",
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    },
    {
        id: 1016,
        // url: "https://picsum.photos/id/1016/600/400",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    },
    {
        id: 1018,
        // url: "https://picsum.photos/id/1018/600/400",
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    },
    {
        id: 1020,
        // url: "https://picsum.photos/id/1020/600/400",
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    },
    {
        id: 1025,
        // url: "https://picsum.photos/id/1025/600/400",
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    },
    {
        id: 1031,
        // url: "https://picsum.photos/id/1031/600/400",
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
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
    // {
    //     id: 1052,
    //     url: "https://picsum.photos/id/1052/600/400",
    // },
];


const Carousels = () => {
    const ref = useRef<any>(null)
    const [childs, setChilds] = useState(dummyImages)
    return (
        <Stack
        >
            {/* <CarouselC /> */}
            <Section
                title="Basic"
                flexRow
                gap={2}
            >
                <Carousel >
                    {
                        childs.map((img, i) => (
                            <Box
                                key={img.id}
                                width={"100%"}
                                overflow={"hidden"}
                                radius={2}
                                bgcolor="background.secondary"
                                height={180}
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