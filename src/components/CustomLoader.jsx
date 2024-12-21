import { Loader } from "lucide-react"

const CustomLoader = () => {
    return (
        <div className="w-full h-[65vh] flex justify-center items-center gap-2">
            <span>Please Wait </span> <Loader className="animate-spin" />
        </div>
    )
}

export default CustomLoader
