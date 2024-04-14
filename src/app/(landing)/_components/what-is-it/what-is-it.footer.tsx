import { whatisitfooter } from "./what-is-it.const";
import { commonlyaskedquestions } from "./what-is-it.const";
export default function Footer() {
  return (
    <>
      <div className=" container bg-cyan-600">
        <h1 className="p-6 text-center text-3xl font-bold text-white">
          Third Party Integration{" "}
        </h1>
        <p className=" px-52 text-center font-light text-white">
          PropEZ effortlessly integrates with over 100 widely-used business
          applications, ensuring seamless compatibility with the tools you rely
          on daily. Experience the convenience of having your CRM communicate
          fluently in the same business language as yours.
        </p>

        <div className="grid grid-cols-2 gap-4 rounded-sm p-6 px-52 md:grid-cols-2 lg:grid-cols-2">
          {whatisitfooter.map((footer) => (
            <div
              key={footer.title}
              className="rounded-lg border-black bg-white p-5 text-center text-black shadow"
            >
              <h1 className="text-2xl font-semibold">{footer.title}</h1>
              <p className="mt-2 py-1 ">{footer.description}</p>
            </div>
          ))}
        </div>
      </div>
      <h1 className="py-1 text-2xl font-bold">
        See what our customers have to say
      </h1>
      <div className=" grid grid-cols-1 gap-4 px-40 py-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="w-60 rounded-lg bg-blue-400 p-4 text-center font-semibold shadow">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
          ducimus pariatur asperiores consequuntur magni nostrum quibusdam?
          Delectus quae asperiores, nihil quod a fugit quos aperiam laborum odit
          commodi aspernatur corrupti.
        </div>
        <div className=" w-60 p-4 py-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem cumque officiis odio itaque incidunt pariatur, expedita
          modi reprehenderit. Similique velit consectetur consequatur, expedita
          amet recusandae itaque in corporis vitae blanditiis!
        </div>
      </div>
      <h1 className="py-1 text-3xl font-bold">Frequently Asked Questions</h1>
      <div className="grid grid-cols-2 gap-2  p-4 md:grid-cols-2 lg:grid-cols-2">
        {commonlyaskedquestions.map((questions) => (
          <div
            key={questions.title}
            className=" border-b border-t p-2  text-black "
          >
            {/* <div className=" pl-96">
              <button className=" w-3  py-1 pl-44 text-2xl font-bold  text-blue-500 ">
                +
              </button>
            </div> */}
            <h1 className=" px-24 py-1 font-semibold">{questions.title}</h1>

            <p className="mt-2 py-1 ">{questions.description}</p>
          </div>
        ))}
      </div>
      <h1 className="p-2 py-1 text-center text-3xl font-bold ">
        How PropEZ CRM for Real estate works?
      </h1>
      <p className=" p-2 px-40  text-center text-sm ">
        PropEZ CRM demo for Real Estate, which caters to the needs of real
        estate companies, is customized on native PropEZ CRM Enterprise edition
        for demonstration purposes only. We are here to help you with any
        information you may need, answer any questions you may have, and walk
        you through our customized demo for your business needs.
      </p>
      <button className=" bg-red-500 p-2 text-center text-base font-bold text-white">
        GET A DEMO
      </button>
    </>
  );
}
