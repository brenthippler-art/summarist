import Image from "next/image";

export default function PlanHero() {
  return (
    <section className="bg-[#042330] relative overflow-hidden rounded-b-[80px] md:rounded-b-[220px]">
      <div className="max-w-[900px] mx-auto text-center px-6 pt-16 pb-10 relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-12">
          Get unlimited access to many amazing books to read
        </h1>
        <p className="text-white text-xl">
          Turn ordinary moments into amazing learning opportunities
        </p>
      </div>
      <div className="relative flex justify-center">
        <div className="relative bg-white rounded-t-full max-w-[340px] w-full overflow-hidden">
          <Image
            src="/pricing-top.png"
            alt=""
            width={860}
            height={722}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
