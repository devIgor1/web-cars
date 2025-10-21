import { Shield, Award, Wrench, CreditCard } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Certified Quality",
    description: "Every vehicle undergoes rigorous inspection and comes with comprehensive warranty coverage.",
  },
  {
    icon: Award,
    title: "Premium Selection",
    description: "Handpicked collection of luxury and performance vehicles from top manufacturers worldwide.",
  },
  {
    icon: Wrench,
    title: "Expert Service",
    description: "Professional maintenance and support from certified technicians for your peace of mind.",
  },
  {
    icon: CreditCard,
    title: "Flexible Financing",
    description: "Competitive rates and customized payment plans to make your dream car affordable.",
  },
]

export function Features() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance text-gray-800">Why Choose Web Cars</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Experience unparalleled service and quality in every aspect of your automotive journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-500 mb-6">
                <feature.icon className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed text-sm max-w-xs mx-auto">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
