import {Navigate} from 'react-router-dom'
import { useUser } from "@/context/UserContext";

export default function AdminRoute({children}) {

    const { admin } = useUser()

    return (
        admin ? children : <Navigate to='/' replace/>
    )
}
