"use client";
import Image from "next/image";
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import useDimension from "./hooks/useDimension";


const images = [
	"1.jpg",
	"2.jpg",
	"3.jpg",
	"4.jpg",
	"5.jpg",
	"6.jpg",
	"7.jpg",
	"8.jpg",
	"9.jpg",
	"10.jpg",
	"11.jpg",
	"12.jpg",
];

export default function Home() {
	const container = useRef(null);
	const { height } = useDimension();
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["0 1", "1 0"],
	});
	const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
	const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
	useEffect(() => {
		scrollYProgress.onChange((latest) => console.log(latest));
		const lenis = new Lenis();

		// lenis.on("scroll", (e: any) => {
		// 	console.log(e);
		// });

		function raf(time: any) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, [scrollYProgress]);
	return (
		<main className="main">
			<div className="w-[100vw] h-[100vh] bg-buildings_bg bg-cover bg-bottom bg-clip-text text-transparent">
				<h1 className="text-7xl md:text-9xl font-black tracking-widest flex justify-center items-center w-full h-full font-outline-1 text-center">
					Scroll <br />Down
				</h1>
			</div>
			<div
				ref={container}
				className="gallery h-[175vh] bg-[#2D2D2D] flex gap-[2vw] p-[2vw] box-border overflow-hidden"
			>
				<Column
					images={[images[0], images[1], images[2]]}
					y={y1}
					idx={1}
				></Column>
				<Column
					images={[images[3], images[4], images[5]]}
					y={y2}
					idx={2}
				></Column>
				<Column
					images={[images[6], images[7], images[8]]}
					y={y3}
					idx={3}
				></Column>
				<Column
					images={[images[9], images[10], images[11]]}
					y={y4}
					idx={4}
				></Column>
			</div>
			<div className="w-[100vw] h-[100vh] bg-buildings_bg bg-cover bg-bottom bg-clip-text text-transparent">
				<h1 className="text-7xl md:text-9xl font-black tracking-widest flex justify-center items-center w-full h-full font-outline-1 text-center">
					Scroll Up
				</h1>
			</div>
		</main>
	);
}
type ColumnProps = {
	images: string[];
	y: import("framer-motion").MotionValue<number>;
	idx: number;
};

const Column = ({ images, y, idx }: ColumnProps) => {
	return (
		<motion.div
            className={`column w-[25%] h-full flex flex-col gap-[2vh] min-w-[50px] relative 
                ${idx === 1 ? "-top-[45%]" : ""}
                ${idx === 2 ? "-top-[95%]" : ""}
                ${idx === 3 ? "-top-[35%]" : ""}
                ${idx === 4 ? "-top-[75%]" : ""}`}
			style={{ y }}
		>
			{images.map((src: string, idx: number) => {
				// Prepend the path to the public folder
				const imagePath = `/images/${src}`;
				return (
					<div
						key={idx}
						className="imageContainer w-full h-full relative overflow-hidden rounded-[1vw]"
					>
						<Image
							src={imagePath}
							alt="image"
							fill
							sizes="(max-width) 100vw, 50vw"
							className="object-cover rounded-[1vw]"
						></Image>
					</div>
				);
			})}
		</motion.div>
	);
};
