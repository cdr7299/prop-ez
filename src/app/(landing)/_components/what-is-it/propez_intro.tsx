import Image from "next/image";
import req from "public/req.webp";

export default function Introduction() {
  return (
    <>
      <h1 className="text-3xl font-bold">
        <span className="mr-2 text-accent">PropEZ</span>
        is an easy and effective way to deal with your Real Estate.
      </h1>
      <p className="flex items-center justify-center px-4 py-1 align-middle text-xl text-inherit">
        PropEZ offers a streamlined Real Estate CRM software solution to empower
        realtors. Efficiently manage contacts, schedule tasks, monitor
        pipelines, and stay organized to build successful relationships and
        close deals seamlessly.
      </p>
      <div className="relative h-4/5 w-11/12">
        <Image src={req} alt="image" />
      </div>
      <div className="container  flex size-4/5 rounded-lg bg-slate-500 p-6">
        <div className="w-2/4  rounded-lg  bg-sky-400  px-2  py-2">
          <h1 className="py-1 text-center text-2xl font-semibold">
            What is real estate CRM software
          </h1>
          <p className="py-3 text-center">
            Real estate CRM software is a system that helps manage relationships
            between buyers, sellers, agents, brokers, developers, and financialS
            institutions and caters to the multiple requirements of real estate
            agents and real estate firms. From managing incoming requests to
            preparing price quotes, from selling commercial real-estate to
            property management, the real estate CRM system takes care of the
            end-to-end process management for real estate agencies
          </p>
        </div>
        <div className="w-1/2 p-4 text-center">
          <h1 className="flex px-2 text-center text-2xl font-semibold">
            How is CRM important for realtors?
          </h1>
          <p className="py-2 text-center">
            Real estate is all about building trust, and its no surprise that
            82% of new property sales are referrals from either existing
            contacts, previous clients, family, friends, or relatives. Moreover,
            when it comes to real estate businesses, selling or buying is a long
            process, with many follow-ups and re-negotiations. In such
            scenarios, implementing a real estate CRM software gives realtors an
            efficient way to manage contacts, schedule tasks, monitor their
            pipelines, and stay organized to build successful relationships and
            close deals.
          </p>
        </div>
      </div>
    </>
  );
}
