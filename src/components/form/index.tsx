import { MdImage } from "react-icons/md"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "../../components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { v4 as uuidv4 } from "uuid"
import { db, storage } from "../../services/firebaseConnection"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"
import { FiUpload, FiX } from "react-icons/fi"
import { addDoc, collection } from "firebase/firestore"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { 
  FaCar, 
  FaInfoCircle, 
  FaTachometerAlt, 
  FaCog, 
  FaDollarSign,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone
} from "react-icons/fa"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .string()
    .min(1, "Year is required")
    .refine((value) => /^(\d{4})$/.test(value), {
      message: "4 digits only",
    }),
  km: z.string().min(1, "km is required"),
  price: z.string().min(1, "Price is required"),
  city: z.string().min(1, "City is required"),
  phone: z
    .string()
    .min(1, "WhatsApp is required")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Invalid phone number",
    }),
  description: z.string().min(1, "Description is required"),
  // Performance & Engine specifications
  engine: z.string().min(1, "Engine is required"),
  horsepower: z.string().min(1, "Horsepower is required"),
  torque: z.string().min(1, "Torque is required"),
  acceleration: z.string().min(1, "0-60 mph time is required"),
  topSpeed: z.string().min(1, "Top speed is required"),
  drivetrain: z.string().min(1, "Drivetrain is required"),
  transmission: z.string().min(1, "Transmission is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
})

type FormData = z.infer<typeof schema>

interface ImageItemProps {
  uid: string
  name: string
  previewUrl: string
  url: string
}

export function Form() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  const [carImages, setCarImages] = useState<ImageItemProps[]>([])

  async function handleUpload(image: File) {
    if (!currentUser?.uid) {
      return
    }

    const currentUid = currentUser?.uid

    const uidImage = uuidv4()

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        const imageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        }

        setCarImages((images) => [...images, imageItem])
      })
    })
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type === "image/png" || image.type === "image/jpeg") {
        await handleUpload(image)
      } else {
        toast.error("Only PNG and JPEG images are supported")
        return
      }
    }
  }

  function onSubmit(data: FormData) {
    if (carImages.length === 0) {
      toast.error("Please upload at least one image for the car")
      return
    }

    const carListImages = carImages.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url,
      }
    })

    addDoc(collection(db, "cars"), {
      name: data.name,
      model: data.model,
      phone: data.phone,
      city: data.city,
      year: data.year,
      km: data.km,
      price: data.price,
      description: data.description,
      // Performance & Engine specifications
      engine: data.engine,
      horsepower: data.horsepower,
      torque: data.torque,
      acceleration: data.acceleration,
      topSpeed: data.topSpeed,
      drivetrain: data.drivetrain,
      transmission: data.transmission,
      fuelType: data.fuelType,
      created: new Date(),
      owner: currentUser?.displayName || 'Unknown',
      uid: currentUser?.uid,
      images: carListImages,
    })
      .then(() => {
        reset()
        setCarImages([])
        toast.success("Car registered successfully!")
        navigate("/dashboard", { replace: true })
      })
      .catch((err) => {
        console.log(err)
        toast.error("Failed to register car. Please try again.")
      })
  }

  async function handleDeleteImage(item: ImageItemProps) {
    const imagePath = `images/${item.uid}/${item.name}`

    const imageRef = ref(storage, imagePath)

    try {
      await deleteObject(imageRef)
      setCarImages(carImages.filter((car) => car.url !== item.url))
      toast.success("Image removed")
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete image")
    }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="bg-black text-white rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <FaCar className="text-white text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Add New Car</h1>
                <p className="text-gray-300 text-lg">Fill in the details to list your vehicle</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/3 rounded-full"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Section */}
        <Card className="border-2 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MdImage className="h-5 w-5" />
              Car Images
            </CardTitle>
            <CardDescription>
              Upload high-quality images of your vehicle. Minimum 1 image required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Upload Button */}
              <label className="relative group cursor-pointer">
                <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-primary transition-colors duration-200 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <FiUpload className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">Add Image</span>
                  <span className="text-xs text-gray-400">PNG, JPG</span>
                </div>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFile}
                  multiple
                />
              </label>

              {/* Image Previews */}
              {carImages.map((item, index) => (
                <div
                  key={item.name}
                  className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-primary transition-colors"
                >
                  <img
                    src={item.previewUrl}
                    alt={`Car preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(item)}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded backdrop-blur-sm">
                    {index === 0 ? "Main" : `${index + 1}`}
                  </div>
                </div>
              ))}
            </div>
            {carImages.length === 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                <FaInfoCircle className="inline mr-2" />
                At least one image is required to list your car
              </p>
            )}
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="border-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaInfoCircle className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Enter the essential details about your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <FaCar className="h-4 w-4" />
                  Car Name *
                </Label>
                <Input
                  register={register}
                  type="text"
                  name="name"
                  error={errors.name?.message}
                  placeholder="e.g. Audi A4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Car Model *</Label>
                <Input
                  register={register}
                  type="text"
                  name="model"
                  error={errors.model?.message}
                  placeholder="e.g. B5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="year" className="flex items-center gap-2">
                  <FaCalendarAlt className="h-4 w-4" />
                  Year *
                </Label>
                <Input
                  register={register}
                  type="text"
                  name="year"
                  error={errors.year?.message}
                  placeholder="e.g. 2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="km" className="flex items-center gap-2">
                  <FaTachometerAlt className="h-4 w-4" />
                  Mileage (km) *
                </Label>
                <Input
                  register={register}
                  type="text"
                  name="km"
                  error={errors.km?.message}
                  placeholder="e.g. 25690"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                {...register("description")}
                id="description"
                placeholder="Describe the condition, features, and any important details about your vehicle..."
                className="min-h-[120px] resize-none"
              />
              {errors.description && (
                <p className="text-sm text-destructive font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Location */}
        <Card className="border-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaDollarSign className="h-5 w-5" />
              Pricing & Location
            </CardTitle>
            <CardDescription>
              Set your price and provide contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <FaDollarSign className="h-4 w-4" />
                  Price *
                </Label>
                <Input
                  register={register}
                  type="text"
                  name="price"
                  error={errors.price?.message}
                  placeholder="e.g. 999999"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center gap-2">
                  <FaMapMarkerAlt className="h-4 w-4" />
                  City *
                </Label>
                <Input
                  register={register}
                  type="text"
                  name="city"
                  error={errors.city?.message}
                  placeholder="e.g. New York City"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <FaPhone className="h-4 w-4" />
                WhatsApp Number *
              </Label>
              <Input
                register={register}
                type="text"
                name="phone"
                error={errors.phone?.message}
                placeholder="e.g. 5512345678900"
              />
              <p className="text-xs text-muted-foreground">
                Include country code (11-12 digits total)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Performance & Engine Specifications */}
        <Card className="border-2 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCog className="h-5 w-5" />
              Performance & Engine Specifications
            </CardTitle>
            <CardDescription>
              Technical details about the vehicle's performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="engine">Engine *</Label>
                <Input
                  register={register}
                  type="text"
                  name="engine"
                  error={errors.engine?.message}
                  placeholder="e.g. 3.8L Twin-Turbo V8"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horsepower">Horsepower *</Label>
                <Input
                  register={register}
                  type="text"
                  name="horsepower"
                  error={errors.horsepower?.message}
                  placeholder="e.g. 640 HP"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="torque">Torque *</Label>
                <Input
                  register={register}
                  type="text"
                  name="torque"
                  error={errors.torque?.message}
                  placeholder="e.g. 590 lb-ft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="acceleration">0-60 mph *</Label>
                <Input
                  register={register}
                  type="text"
                  name="acceleration"
                  error={errors.acceleration?.message}
                  placeholder="e.g. 2.6s"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="topSpeed">Top Speed *</Label>
                <Input
                  register={register}
                  type="text"
                  name="topSpeed"
                  error={errors.topSpeed?.message}
                  placeholder="e.g. 205 mph"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="drivetrain">Drivetrain *</Label>
                <Input
                  register={register}
                  type="text"
                  name="drivetrain"
                  error={errors.drivetrain?.message}
                  placeholder="e.g. All-Wheel Drive"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission *</Label>
                <Input
                  register={register}
                  type="text"
                  name="transmission"
                  error={errors.transmission?.message}
                  placeholder="e.g. 8-Speed PDK"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type *</Label>
                <Input
                  register={register}
                  type="text"
                  name="fuelType"
                  error={errors.fuelType?.message}
                  placeholder="e.g. Gasoline"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="px-8"
          >
            Cancel
          </Button>
          <Button type="submit" size="lg" className="px-8">
            Register Car
          </Button>
        </div>
      </form>
    </div>
  )
}
