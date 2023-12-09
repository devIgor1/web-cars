import Container from "../../../components/container"
import { DashboardHeader } from "../../../components/panelHeader"
import { MdOutlineFileUpload } from "react-icons/md"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { v4 as uuidv4 } from "uuid"
import { storage } from "../../../services/firebaseConnection"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"

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
})

type FormData = z.infer<typeof schema>

export function New() {
  const { user } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return
    }

    const currentUid = user?.uid

    const uidImage = uuidv4()

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {})
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
    console.log(data)
  }

  return (
    <Container>
      <DashboardHeader />

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-5">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32">
          <div className="absolute cursor-pointer">
            <MdOutlineFileUpload size={30} />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              className=" cursor-pointer bg-black h-32 opacity-0"
              onChange={handleFile}
            />
          </div>
        </button>
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

          <button
            type="submit"
            className="rounded-md bg-zinc-950 p-2 w-full text-white font-bold hover:bg-zinc-900 duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </Container>
  )
}
