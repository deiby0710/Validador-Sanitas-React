import { BtnNavigation } from "../components/Home/BtnNavigation"

export const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-white p-4 rounded shadow text-center" style={{ minWidth: '320px' }}>
        <h4 className="mb-2">Validador Sanitas</h4>
        <p className="text-muted mb-4">
          Consulta de pacientes y autorizaciones
        </p>

        <div className="d-flex flex-column gap-3">
          <BtnNavigation
            label="Consultar Paciente"
            route="/validador"
          />
          <BtnNavigation
            label="Consultar Autorización"
            route="/consultAuth"
          />
        </div>
      </div>
    </div>
  )
}
