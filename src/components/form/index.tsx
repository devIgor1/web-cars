import { MdOutlineFileUpload } from "react-icons/md"
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
import { FiTrash } from "react-icons/fi"
import { addDoc, collection } from "firebase/firestore"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Button } from "../button"

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
        alert("Only png and jpeg images are supported")
        return
      }
    }
  }

  function onSubmit(data: FormData) {
    if (carImages.length === 0) {
      toast.error("Please select images for car ")
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
        toast.success("Car registered successfully")
        navigate("/dashboard", { replace: true })
      })
      .catch((err) => console.log(err))
  }

  async function handleDeleteImage(item: ImageItemProps) {
    const imagePath = `images/${item.uid}/${item.name}`

    const imageRef = ref(storage, imagePath)

    try {
      deleteObject(imageRef)
      setCarImages(carImages.filter((car) => car.url !== item.url))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-5">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-44">
          <div className="absolute cursor-pointer">
            <MdOutlineFileUpload size={30} />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              className=" cursor-pointer bg-black h-44 opacity-0"
              onChange={handleFile}
            />
          </div>
        </button>

        {carImages.map((item) => (
          <div
            key={item.name}
            className="w-full h-44 flex items-center justify-center relative"
          >
            <button
              className="absolute top-2 left-2 bg-white p-1 rounded"
              onClick={() => handleDeleteImage(item)}
            >
              <FiTrash size={21} color="#dc143c" />
            </button>
            <img
              src={item.previewUrl}
              className="rounded-lg w-full h-44 object-cover"
              alt="Car image"
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center mt-2 font-poppins">
        <form className="w-full mb-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Car Name</p>
            <Input
              register={register}
              type="text"
              name="name"
              error={errors.name?.message}
              placeholder="e.g. Audi A4"
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Car Model</p>
            <Input
              register={register}
              type="text"
              name="model"
              error={errors.model?.message}
              placeholder="e.g. B5"
            />
          </div>
          <div className="w-full flex mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Year of the Car</p>
              <Input
                register={register}
                type="text"
                name="year"
                error={errors.year?.message}
                placeholder="e.g. 2001"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Mileage (in kilometers)</p>
              <Input
                register={register}
                type="text"
                name="km"
                error={errors.km?.message}
                placeholder="e.g. 25690km"
              />
            </div>
          </div>
          <div className="w-full flex mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Phone Number</p>
              <Input
                register={register}
                type="text"
                name="phone"
                error={errors.phone?.message}
                placeholder="e.g. 01234567899"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">City</p>
              <Input
                register={register}
                type="text"
                name="city"
                error={errors.city?.message}
                placeholder="e.g. New York City"
              />
            </div>
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Price</p>
            <Input
              register={register}
              type="text"
              name="price"
              error={errors.price?.message}
              placeholder="e.g. $999.999"
            />
          </div>
          <div>
            <p className="mb-2 font-medium">Description</p>
            <textarea
              className="border-2 w-full rounded-md h-20 px-2 p-1 resize-none"
              {...register("description")}
              name="description"
              id="description"
              placeholder="e.g. description here"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description?.message}</p>
            )}
          </div>

          {/* Performance & Engine Specifications */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Performance & Engine</h3>
            
            <div className="w-full flex mb-3 flex-row items-center gap-4">
              <div className="w-full">
                <p className="mb-2 font-medium">Engine</p>
                <Input
                  register={register}
                  type="text"
                  name="engine"
                  error={errors.engine?.message}
                  placeholder="e.g. 3.8L Twin-Turbo V8"
                />
              </div>
              <div className="w-full">
                <p className="mb-2 font-medium">Horsepower</p>
                <Input
                  register={register}
                  type="text"
                  name="horsepower"
                  error={errors.horsepower?.message}
                  placeholder="e.g. 640 HP"
                />
              </div>
            </div>

            <div className="w-full flex mb-3 flex-row items-center gap-4">
              <div className="w-full">
                <p className="mb-2 font-medium">Torque</p>
                <Input
                  register={register}
                  type="text"
                  name="torque"
                  error={errors.torque?.message}
                  placeholder="e.g. 590 lb-ft"
                />
              </div>
              <div className="w-full">
                <p className="mb-2 font-medium">0-60 mph</p>
                <Input
                  register={register}
                  type="text"
                  name="acceleration"
                  error={errors.acceleration?.message}
                  placeholder="e.g. 2.6s"
                />
              </div>
            </div>

            <div className="w-full flex mb-3 flex-row items-center gap-4">
              <div className="w-full">
                <p className="mb-2 font-medium">Top Speed</p>
                <Input
                  register={register}
                  type="text"
                  name="topSpeed"
                  error={errors.topSpeed?.message}
                  placeholder="e.g. 205 mph"
                />
              </div>
              <div className="w-full">
                <p className="mb-2 font-medium">Drivetrain</p>
                <Input
                  register={register}
                  type="text"
                  name="drivetrain"
                  error={errors.drivetrain?.message}
                  placeholder="e.g. All-Wheel Drive"
                />
              </div>
            </div>

            <div className="w-full flex mb-3 flex-row items-center gap-4">
              <div className="w-full">
                <p className="mb-2 font-medium">Transmission</p>
                <Input
                  register={register}
                  type="text"
                  name="transmission"
                  error={errors.transmission?.message}
                  placeholder="e.g. 8-Speed PDK"
                />
              </div>
              <div className="w-full">
                <p className="mb-2 font-medium">Fuel Type</p>
                <Input
                  register={register}
                  type="text"
                  name="fuelType"
                  error={errors.fuelType?.message}
                  placeholder="e.g. Gasoline"
                />
              </div>
            </div>
          </div>

          <Button type="submit">Register</Button>
        </form>
      </div>
    </>
  )
}
