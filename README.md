# Validador Sanitas

Sistema web para validar derechos del afiliado y consultar autorizaciones PBS y NPBS para la dispensación de medicamentos, integrando servicios de Sanitas (Imperium + BlueHealth), cálculo normativo de copagos y trazabilidad clínica.

---

## 🧩 1. ¿Qué hace el sistema?

El sistema permite:

- Validar derechos del usuario (estado, plan, contrato, régimen).
- Consultar autorizaciones PBS (POS) y NPBS (NO POS).
- Identificar automáticamente si una autorización es PBS o NPBS.
- Mostrar datos clínicos, administrativos y de copago.
- Calcular el copago aplicando la normatividad vigente.
- Consultar información clínica detallada NPBS mediante `MedicationDispense`.
- Registrar la dispensación del medicamento.
- Realizar el consumo de la autorizacion.

---

## 🏗️ 2. Tecnologías utilizadas

### 🔹 **Frontend**
- React + Vite  
- Axios  
- Bootstrap  
- React Router DOM  
- SweetAlert2  

### 🔹 **Backend**
- Node.js (v22.16.0)
- Express
- CORS
- dotenv
- JSON Web Token
- mysql2 (conexión a DB local para registrar consultas)
- node-fetch (para consumir APIs externas de Sanitas)

### 🔹 **Servicios externos consumidos**
- **Imperium (Sanitas)**
- **BlueHealth – BH (Sanitas)**
- Servicios:
  - `consultaAuthorization` (PBS)
  - `copayAmount` (régimen + categoría)
  - `MedicationDispense` (NPBS)
  - `PatientSummary`
  - Otros servicios clínicos y administrativos asociados.

---

## 🗂️ 3. Estructura del proyecto

```
Validador-Sanitas/
│
├── backend/
│   ├── config/
│   ├── src/
│   ├── .env.development
│   ├── .env.preproduction
│   ├── .env.production
│   ├── server.js
│   ├── package.json
│   └── ecosystem.config.cjs
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── router/
    │   ├── services/
    │   ├── utils/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── vite.config.js
    ├── package.json
    └── README.md
```

---

## ⚙️ 4. Instalación y ejecución

### 🔹 **Frontend**

```
cd frontend
npm install
npm run dev
```

### Variables de entorno (`frontend/.env`)

```
VITE_API_BASE_URL=https://<url-backend>
```

### 🔹 **Backend**

```
cd backend

# Desarrollo
npm run start:dev

# Preproducción
npm run start:pre

# Producción
npm run start:prod
```

El backend usa `PM2` para producción:

- `start:prod` → inicia servicio
- `start:prod:restart` → reinicia servicio

---

## 🧠 5. Lógica del sistema (visión general)

### 5.1 Identificación PBS vs NPBS

La autorización se clasifica según:

```
desTipoAtencion:
- “MEDICAMENTOS POS” → PBS
- “MEDICAMENTOS NO POS” → NPBS
```

### 5.2 Flujo PBS

1. Consultar `consultaAuthorization`
2. Consultar `copayAmount`
3. Mostrar medicamentos PBS
4. Aplicar cálculo de copago según normatividad
5. Permitir consumir autorización

### 5.3 Flujo NPBS

1. Consultar `consultaAuthorization` (pero **datos clínicos vienen incompletos**)
2. Consultar `MedicationDispense`
3. Sanitizar respuesta con `mapMedicationDispenseResponse`
4. Mapear datos NPBS con `parseMedicationDispense`
5. Renderizar componente `MedicationListNPBS`

### 5.4 Cálculo de copago (normativa Sanitas)

Regla general:

- Si `copayAmount.costToBeneficiary.valueMoney.value > 0`  
  → Ese es el valor del cobro.
- Si `valueMoney.value = 0` **y** `exception.text = "Sin cobro de cuota moderadora"`  
  → Se debe tomar `copayPercentage` de `consultAuthorization`.

Ese porcentaje se debe aplicar al valor de la tecnología, considerando:

- Régimen del afiliado
- Categoría A, B o C
- Límites máximos por evento y por anualidad

---

## 🩺 6. Servicios consumidos

### **PBS**
- `consultaAuthorization`
- `copayAmount`

### **NPBS**
- `MedicationDispense` (datos clínicos completos)
- Prescriptor real  
- Diagnóstico real  
- CUM real  
- Dirección MIPRES  
- Cantidad dispensada  
- Sede  
- Fecha registrada  
- Información farmacéutica

---

## 🎨 7. Componentes principales del frontend

- `AuthorizationInfo` → datos administrativos de la autorización
- `MedicalOrderDetails` → información de la orden médica
- `MedicationList` → medicamentos PBS
- `MedicationListNPBS` → medicamentos NPBS
- `BtnConsumir` → acción para consumir la autorización
- Hooks:
  - `useAuthData`
  - `useMedDispense`

---

## 🔐 8. Seguridad

- El backend firma JWT para gestionar sesiones internas.
- Las claves de entorno se manejan con `.env` por ambiente:
  - development  
  - preproduction  
  - production  

---

## 📌 9. Notas finales

- El proyecto está dividido en frontend y backend por simplicidad de despliegue.
- Toda la lógica de cálculo de copago está centralizada en `useAuthData`.
- Las respuestas NPBS se sanitizan mediante `mapMedicationDispenseResponse`.

---

## 🧑‍💻 Autor

**Deiby Alejandro Delgado**  
Proyecto interno — Genhospi / Sanitas  