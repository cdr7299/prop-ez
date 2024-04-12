import Image from "next/image";
import req from "public/req.webp";
import a from "public/a.webp";
import b from "public/b.webp";
import c from "public/c.webp";
import d from "public/d.webp";
import e from "public/e.webp";
import f from "public/f.webp";
import g from "public/g.webp";
import h from "public/h.webp";
import i from "public/i.webp";
// import { data_array } from "./data";
export default function WhatIsIt() {
  return (
    <div className="container flex w-full max-w-screen-2xl flex-col items-center justify-center gap-12 bg-gray-50 px-4 py-8 pt-16 dark:bg-gray-800  sm:min-h-[calc(100vh-4.5rem)]">
      <h1 className="text-3xl font-bold">
        <span className="mr-2 text-accent">PropEZ</span>
        is an easy and effective way to deal with your Real Estate.
      </h1>
      <p className="flex items-center justify-center px-4 py-1 align-middle text-xl text-inherit">
        Propez offers a streamlined Real Estate CRM software solution to empower
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
            between buyers, sellers, agents, brokers, developers, and financial
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
      <h1 className="text-3xl font-bold">
        Why choose Propez CRM for your real estate business?
      </h1>
      {/* {data_array.map((item: any) => (
          <div className="bg-red-500" key={item.id}>
            <p>{item.title}</p>
            <p>{item.description}</p>
          </div>
        ))} */}
      <div className="grid grid-cols-3 gap-4  p-4  px-8">
        <div className="rounded-lg border border-black bg-zinc-400 p-5 text-center">
          <div className="w-10 rounded-lg"></div>
          <h1 className="bg text-2xl font-medium">
            Enhancing omnichannel communication
          </h1>
          <p className="py-1">
            to effectively capture inquiries from various channels
          </p>
        </div>
        <div className="rounded-lg border border-black bg-zinc-400 p-5 text-center">
          <h1 className="bg text-2xl font-medium">Seamless Drip Campaigns</h1>
          <p className="py-1">
            for implementation of automated and continuous email outreach
            strategies that smoothly transition between stages or messages,
            ensuring a cohesive and uninterrupted flow of communication with
            recipients over time.
          </p>
        </div>
        <div className="rounded-lg border border-black bg-zinc-400 p-5 text-center">
          <h1 className="bg text-2xl font-medium ">
            Augmented Productivity via Integrations
          </h1>
          <p className="py-1">
            for enhancement of efficiency and effectiveness in tasks or
            workflows by incorporating external tools, systems, or APIs into the
            existing infrastructure
          </p>
        </div>
        <div className="rounded-lg border border-black bg-zinc-400 p-5 text-center">
          <h1 className="bg text-2xl font-medium">Streamlining Workflows</h1>
          <p className="py-1">
            Leveraging Third-Party Integrations and APIs for Enhanced
            Productivity and Efficiency
          </p>
        </div>
        <div className="rounded-lg border border-black bg-zinc-400 p-5 text-center">
          <h1 className="bg text-2xl font-medium">Tailored Customization</h1>
          <p className="py-1">
            Adapting to the Distinct Processes and Needs of Real Estate Agents
            for Comprehensive Solutions
          </p>
        </div>
        <div className="rounded-lg border border-black bg-zinc-400 p-5 text-center">
          <h1 className="bg text-2xl font-medium">
            Empowering Direct Engagement
          </h1>
          <p className="py-1">
            Implementing Self-Service Portals to Facilitate Seamless Connections
            between Sellers, Buyers, and Your Business
          </p>
        </div>
      </div>
      <h1 className="py-2 text-2xl">
        Key features of real estate CRM software
      </h1>
      <div className="container px-72 text-center align-middle">
        <div className="text-center align-middle">
          <h1 className="py-2 text-3xl font-bold">Lead Lifecycle Management</h1>
          <p className="py-2 text-base">
            Streamline lead management processes by strategically capturing,
            monitoring, and cultivating leads throughout their journey within
            the Propez CRM, employing cutting-edge lead scoring, automated
            assignment, and nurturing protocols to drive conversions
            effectively.
          </p>
          <div className="relative h-5/6 max-w-max py-8">
            <Image src={a} alt="image" />
          </div>
        </div>
        <div className=" text-center align-middle">
          <h1 className="py-2 text-3xl font-bold">Workflow Automation</h1>
          <p className="py-2 text-base">
            Streamline operations and boost efficiency with automation features
            within the Propez CRM, automating repetitive tasks, notifications,
            reminders, and task allocations, minimizing manual intervention and
            maximizing productivity within the CRM ecosystem.
          </p>
          <div className="relative h-5/6 max-w-max py-8">
            <Image src={b} alt="image" />
          </div>
        </div>
        <div className="py-2">
          <h1 className="py-2 text-3xl font-bold">Automated Processes</h1>
          <p className="py-2">
            Execute captivating email campaigns with finesse within the Propez
            CRM, leveraging sophisticated automation tools to deliver tailored
            messages, newsletters, and drip campaigns directly from the CRM
            platform, enhancing communication and lead nurturing efforts.
          </p>
          <div className="relative h-5/6 max-w-max py-8">
            <Image src={c} alt="image" />
          </div>
        </div>
        <div className="py-2">
          <h1 className="py-2 text-3xl font-bold">
            Task and Agenda Orchestration
          </h1>
          <p className="py-2">
            Masterfully orchestrate tasks, appointments, and events with
            precision within the Propez CRM, ensuring impeccable time management
            and follow-through on critical deadlines, all within the CRM
            ecosystem.
          </p>
          <div className="relative h-5/6 max-w-max py-8">
            <Image src={d} alt="image" />
          </div>
        </div>
        <div className="py-2">
          <h1 className="py-2 text-3xl  font-bold">Document Repository</h1>
          <p className="py-2">
            Provide a robust repository for property-related documents,
            contracts, and communications within the Propez CRM, featuring
            advanced version control and secure sharing capabilities, ensuring
            easy access and organization of essential documents within the CRM
            ecosystem.
          </p>
          <div className="relative h-5/6 max-w-max py-8">
            <Image src={e} alt="image" />
          </div>
        </div>
        <div className="py-2">
          <h1 className="py-2 text-3xl font-bold">Easy invoices and bills</h1>
          <p className="py-2">
            PropEz CRM helps you complete your sales cycle by enabling your team
            to create and store quotes, invoices, price books, and bills in
            their accounts. Manage all your post-sales processes using powerful
            inventory management features, and share your quotes and invoices to
            prospects through custom email and invoice templates.
          </p>
          <div className="relative h-5/6 max-w-max py-8">
            <Image src={f} alt="image" />
          </div>
        </div>
        <div className="py-2">
          <h1 className="py-2 text-3xl font-bold">Insightful Analytics</h1>
          <p className="py-2">
            Unlock deep insights into performance metrics and market trends with
            powerful reporting and analytics tools within the Propez CRM,
            driving informed decision-making and optimizing business strategies
            within the CRM environment.
          </p>
          <div className="relative h-5/6 max-w-max py-8">
            <Image src={g} alt="image" />
          </div>
        </div>
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
              Maintain peak productivity on the go with the Propez Mobile
              Productivity Suite, enjoying a sleek mobile interface or dedicated
              apps offering seamless property search, lead management, and
              communication features from anywhere.
            </p>
          </div>
        </div>
      </div>
      <h1 className=" text-3xl  font-bold">Benefits of a CRM software</h1>
      <div className="flex scroll-py-2.5 px-64  text-center align-top  font-medium">
        <div className="m-2 flex-grow p-2">
          <h1 className="text-xl font-semibold text-sky-600">300%</h1>
          Improvement in lead conversion rates
        </div>
        <div className="m-2 flex-grow p-2">
          <h1 className="text-xl font-semibold text-sky-600">41%</h1>
          Revenue increase per sales person.
        </div>
        <div className="m-2 flex-grow p-2">
          <h1 className="text-xl font-semibold text-sky-600">26%</h1>
          Improvement in customer retention rates
        </div>
        <div className="m-2 flex-grow p-2">
          <h1 className="text-xl font-semibold text-sky-600">47%</h1>
          Increase in customer satisfaction rates
        </div>
      </div>
    </div>
  );
}
