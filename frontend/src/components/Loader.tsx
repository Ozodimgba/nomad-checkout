import { BiLoaderAlt } from "react-icons/bi";

interface FCProps {
    className: string;
}

export default function Loader({ className}: FCProps) {
 return(
        <BiLoaderAlt color="white" size={40} className={`animate-spin ${className} mr-2`} aria-label="Loading" />
 )
}