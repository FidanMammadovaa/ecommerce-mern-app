import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
export default function Logout() {
    const navigate = useNavigate()

    const handleRemoveSessionToken = () => {
        Cookies.remove("sessionToken")
        navigate("/")
        window.location.reload()
    }

    
    return (<button onClick={() => handleRemoveSessionToken()}>Logout</button>)
}