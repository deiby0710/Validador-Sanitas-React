export const bodyConsumo = (numeroAutorizacion, codigo, sucursal, estado) => {
  const date = new Date();
  const currentDay = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  .toISOString()
  .split(".")[0];
  const body = {
    "resourceType": "Bundle",
    "type": "transaction",
    "entry": [
      {
        "fullUrl": `ServiceRequest/${numeroAutorizacion}`,
        "resource": {
          "resourceType": "Parameters",
          "parameter": [
            {
              "name": "operation",
              "part": [
                {
                  "name": "type",
                  "valueCode": "add"
                },
                {
                  "name": "path",
                  "valueString": "ServiceRequest"
                },
                {
                  "name": "name",
                  "valueString": "status"
                },
                {
                  "name": "value",
                  "valueString": `${estado}`
                }
              ]
            },
            {
              "name": "operation",
              "part": [
                {
                  "name": "type",
                  "valueCode": "add"
                },
                {
                  "name": "path",
                  "valueString": "ServiceRequest"
                },
                {
                  "name": "name",
                  "valueString": "orderDetail"
                },
                {
                  "name": "value",
                  "valueCodeableConcept": {
                    "coding": [
                      {
                        "system": "BH/Origen",
                        "code": "13"
                      }
                    ]
                  }
                }
              ]
            }
          ]
        },
        "request": {
          "method": "PATCH",
          "url": `ServiceRequest/${numeroAutorizacion}`
        }
      },
      {
        "request": {
          "method": "POST",
          "url": "Encounter/GUID7043520"
        },
        "resource": {
          "resourceType": "Encounter",
          "id": "GUID7043520",
          "status": "finished",
          "class": "1",
          "period": {
          "start": currentDay
          },
          "serviceProvider": {
            "reference": `Organization/${codigo}`,
            "display": "Producto Colsanitas"
          },
          "basedOn": {
            "reference": `ServiceRequest/${numeroAutorizacion}`,
            "display": "Numero de autorizacion"
          },
          "participant": [
            {
              "type": [
                {
                  "text": "Practitioner"
                }
              ],
              "individual": {
                "reference": `Practitioner/${sucursal}`
              }
            }
          ],
          "extension": [
            {
              "url": "typeVirtualEncounter",
              "valueInteger": null
            },
            {
              "url": "additionalCareInformation",
              "valueInteger": null
            },
            {
              "url": "additionalCareInformation",
              "valueInteger": null
            },
            {
              "url": "typeVirtualEncounter",
              "valueInteger": null
            },
            {
              "url": "typeVirtualEncounter",
              "valueInteger": null
            }
          ]
        }
      }
    ]
  }
  return body;
}