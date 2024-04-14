import Image from "next/image";
import { data } from "./what-is-it.const";
import { features } from "./what-is-it.const";
import { benefitsofcrm } from "./what-is-it.const";
import i from "public/i.webp";
import h from "public/h.webp";
export default function MainContent() {
  return (
    <>
      <h1 className="text-3xl font-bold">
        Why choose PropEZ CRM for your real estate business?
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {data.map((datas) => (
          <div
            key={datas.title}
            className="rounded-lg border-black bg-zinc-400 p-5 text-center"
          >
            <h2 className="text-2xl font-medium">{datas.title}</h2>
            <p className="mt-2 py-1 ">{datas.description}</p>
          </div>
        ))}
      </div>
      <h1 className="py-2 text-2xl">
        Key features of real estate CRM software
      </h1>

      <div className="container flex flex-col px-72 py-2 text-center align-middle">
        {features.map((feature) => (
          <div key={feature.title} className="my-4">
            <h2 className="mb-2 py-2 text-3xl font-bold">{feature.title}</h2>
            <p className="py-2 text-center text-base">{feature.description}</p>
            <Image
              className="py-2"
              src={feature.imageSrc}
              alt="Description of the image"
              width={700}
              height={1000}
            />
          </div>
        ))}
      </div>
      <div className=" container px-72 text-center align-middle">
        <div className="flex py-8">
          <div className=" relative h-96 w-4/5 p-2 text-left">
            <Image src={h} alt="image" />
          </div>
          <div className=" relative -left-16 h-72 w-3/5 py-16 text-left">
            <Image src={i} alt="image" />
          </div>

          <div className=" left-2  m-2 py-2">
            <h1 className="text-3xl font-bold">Mobile Productivity Suite</h1>
            <p className="h-4/5">
              Maintain peak productivity on the go with the PropEZ Mobile
              Productivity Suite, enjoying a sleek mobile interface or dedicated
              apps offering seamless property search, lead management, and
              communication features from anywhere.
            </p>
          </div>
        </div>
      </div>
      <h1 className=" text-3xl  font-bold">Benefits of a CRM software</h1>
      <div className="grid scroll-py-2.5  grid-cols-4 gap-4 px-64 text-center ">
        {benefitsofcrm.map((boc) => (
          <div key={boc.title} className=" border-r-2 border-gray-200 p-2">
            <h1 className="text-xl font-bold text-sky-600">{boc.title}</h1>
            <p>{boc.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
