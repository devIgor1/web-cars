import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Separator } from "./ui/separator"
import { MessageCircle, Shield, Award, Calendar } from "lucide-react"

interface CarContactCardProps {
  price: string
  carName: string
  carYear: number
  stockNumber: string
  whatsappNumber: string
}

export function CarContactCard({ price, carName, carYear, stockNumber, whatsappNumber }: CarContactCardProps) {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${carYear} ${carName} (Stock #${stockNumber}) listed at ${price}. Can you provide more information?`,
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <Card className="p-6 sticky top-24">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Price</p>
        <p className="font-serif text-4xl font-bold">{price}</p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-3 mb-6">
        <Button
          size="lg"
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 cursor-pointer"
          onClick={handleWhatsAppContact}
        >
          <MessageCircle className="h-5 w-5" />
          Contact via WhatsApp
        </Button>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-accent" />
          <div>
            <p className="font-semibold text-sm">Certified Pre-Owned</p>
            <p className="text-xs text-muted-foreground">Comprehensive warranty included</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Award className="h-5 w-5 text-accent" />
          <div>
            <p className="font-semibold text-sm">Full Service History</p>
            <p className="text-xs text-muted-foreground">Maintained by authorized dealers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-accent" />
          <div>
            <p className="font-semibold text-sm">Financing Available</p>
            <p className="text-xs text-muted-foreground">Competitive rates from 3.9% APR</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
