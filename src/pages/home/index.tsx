export function Home() {
  return (
    <>
      <div className="xl:flex xl:items-center xl:justify-center gap-48 px-16">
        <div className="relative flex items-center justify-center flex-col gap-4 ">
          <div className="absolute inset-0 bg-zinc-700 rounded-full blur-3xl h-64"></div>
          <h1 className="text-white lg:text-5xl text-center font-lora italic text-4xl relative">
            Not just a car, but your <span className="underline">passion</span>
          </h1>
          <p className="text-white max-w-lg text-center mt-5 text-lg xl:text-2xl  relative font-poppins italic">
            "Life is a journey, enjoy the ride. Cars aren't just machines;
            they're vessels that carry our dreams, passions, and the stories of
            our adventures."
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="min-w-full">
            <img
              className="md:w-[864px] md:h-[550px] mt-28"
              src="./car-homepage.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <section className="w-full flex items-center flex-col mt-10 gap-5"></section>
    </>
  )
}
