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


import { useEffect } from "react"

function CarouselC() {
    const containerRef = useRef(null)
    const slidesRef = useRef([])

    const state = useRef({
        current: 0,
        target: 0,
        velocity: 0,
        slideWidth: 0,
        totalWidth: 0,
        slidesToShow: 3,
    })

    const slides = ["A", "B", "C", "D", "E", "F"]

    // setup
    useEffect(() => {
        const container = containerRef.current
        const slideWidth = container.offsetWidth / state.current.slidesToShow

        state.current.slideWidth = slideWidth
        state.current.totalWidth = slideWidth * slides.length

        animate()
    }, [])

    // animation loop (like Embla)
    const animate = () => {
        const s = state.current

        // smooth physics
        s.current += (s.target - s.current) * 0.1

        slidesRef.current.forEach((slide, i) => {
            let x = i * s.slideWidth - s.current

            // 🔁 infinite loop reposition
            if (x < -s.totalWidth / 2) x += s.totalWidth
            if (x > s.totalWidth / 2) x -= s.totalWidth

            slide.style.transform = `translate3d(${x}px,0,0)`
        })

        // requestAnimationFrame(animate)
    }


    // controls
    const next = () => {
        state.current.target += state.current.slideWidth
    }

    const prev = () => {
        state.current.target -= state.current.slideWidth
    }

    return (
        <div style={{ width: "600px", margin: "50px auto" }}>
            <div
                ref={containerRef}
                style={{
                    overflow: "hidden",
                    position: "relative",
                    height: "150px",
                    border: "1px solid #ccc",
                }}
            >
                {slides.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => (slidesRef.current[i] = el)}
                        style={{
                            position: "absolute",
                            width: `${100 / state.current.slidesToShow}%`,
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#eee",
                            border: "1px solid #ddd",
                            willChange: "transform",
                            color: "#333",
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 20 }}>
                <button onClick={prev}>Prev</button>
                <button onClick={next} style={{ marginLeft: 10 }}>
                    Next
                </button>
            </div>
        </div>
    )
}


const Carousels = () => {
    const ref = useRef<any>(null)
    return (
        <Stack
        >
            <CarouselC />
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