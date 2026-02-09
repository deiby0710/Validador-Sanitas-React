import { useNavigate } from "react-router-dom"

export const BtnNavigation = ({label, route}) => {
    const navigate = useNavigate()

    const handleButton = () => {
        navigate(route)
    }

    return (
        <button onClick={handleButton} className="btn btn-dark btn-rounded-1">
            {label}
        </button>
    )
}