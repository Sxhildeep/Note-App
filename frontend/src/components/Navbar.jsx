import { Link } from "react-router-dom"
import { PlusIcon } from "lucide-react"
export default function Navbar (){

    return(
        <>
            
            <header className="bg-base-300 border-b border-base-content/10">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-primary font-mono tracking-light">Thinkboard</h1>
                        <Link to={"/create"} className="btn btn-primary">
                        <span className="font-mono text-base">Add Note</span>
                        <PlusIcon className="h-5 w-5"/>
                        </Link>
                        
                    </div>
                </div>
            </header>
            
        </>
    )
}