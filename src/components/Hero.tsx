
export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-16 lg:pt-20">
      <div className="absolute inset-0 bg-[url('/luxury-sports-car-in-modern-showroom.jpg')] bg-cover bg-center opacity-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-8 px-6 py-3 bg-cyan-500 text-white text-sm font-medium rounded-full">
            Premium Collection 2025
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 text-balance uppercase">
            DRIVE YOUR DREAM
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover an exceptional collection of luxury and performance vehicles.
            <br />
            Every car tells a story of craftsmanship, innovation, and pure driving pleasure.
          </p>

        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 text-gray-700 pb-8">
        <span className="text-xs uppercase tracking-wider font-bold">SCROLL TO EXPLORE</span>
        <div className="w-px h-16 bg-gray-700" />
      </div>
    </section>
  )
}
