import { Filter } from "lucide-react"
import { useState } from "react"

const NotFound = () => {
  const [open ,setopen] = useState(false)
   return (
    <div>
    <Filter onClick={()=>setopen(!open)}/>
      {
        open &&
        <div className="side-bar">
        notfo    
         </div>  
      }
    </div>
  )
}

export default NotFound
