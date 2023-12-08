import Container from "../../../components/container"
import { DashboardHeader } from "../../../components/panelHeader"
import { MdOutlineFileUpload } from "react-icons/md"

export function New() {
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
            />
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center mt-2"></div>
    </Container>
  )
}
