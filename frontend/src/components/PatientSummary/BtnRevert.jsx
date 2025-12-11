import { useNavigate } from "react-router-dom"

export const BtnRevert = () => {
    const navigate = useNavigate()

    const handleRevert = () => {
        navigate('/revertAuth')
    }
    return (
        <div className="d-flex justify-content-center pb-2"> 
            <button className="btn btn-secondary" onClick={handleRevert}>
                Revertir
            </button>
        </div>
    )
}