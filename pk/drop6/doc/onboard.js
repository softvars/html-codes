{
  "status": "OK",
  "message": null,
  "data": [
    {
      "name": "Label",
      "description": "Widget Label",
      "code": "LABEL",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [
        {
          "code": "LABEL",
          "name": "label",
          "description": "Label",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Invito al login",
      "description": "Widget invito al login",
      "code": "INVITO_LOGIN",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [],
      "properties": []
    },
    {
      "name": "Obbligo di login",
      "description": "Widget obbligo di login nel caso CF sia cliente",
      "code": "LOGIN_SE_CLIENTE",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [],
      "properties": []
    },
    {
      "name": "Numero intestatari",
      "description": "Widget numero intestatari",
      "code": "NUMERO_INTESTATARI",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "MAX_INTESTATARI",
          "name": "Max intestatari",
          "description": "Massimo numero intestatari",
          "multi": false,
          "status": [
            {
              "code": "MAX_2_INTESTATARI",
              "description": "Il widget/componente prevede massimo due intestatari",
              "style": null
            },
            {
              "code": "MAX_3_INTESTATARI",
              "description": "Il widget/componente prevede massimo tre intestatari",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        },
        {
          "code": "DATI_PREACQUISITI",
          "name": "Dati preacquisiti",
          "description": "Dati preacquisiti",
          "multi": false,
          "status": [
            {
              "code": "LETTURA_SCRITTURA",
              "description": "Il widget/componente viene mostrato con dati prepopolati ma modificabili",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "INTESTATARI_1",
          "name": "un intestatario",
          "description": "A me",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "INTESTATARI_2",
          "name": "due intestatari",
          "description": "A me e una persona",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "INTESTATARI_3",
          "name": "tre intestatari",
          "description": "A me e a due persone",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Numero fisso intestatari",
      "description": "Widget numero fisso di intestatari",
      "code": "INTESTATARI_FISSI",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "NUM_INTESTATARI",
          "name": "Num intestatari",
          "description": "Numero intestatari",
          "multi": false,
          "status": [
            {
              "code": "2_INTESTATARI",
              "description": "Il widget/componente prevede due intestatari",
              "style": null
            },
            {
              "code": "3_INTESTATARI",
              "description": "Il widget/componente prevede tre intestatari",
              "style": null
            }
          ]
        },
        {
          "code": "VISUALIZZAZIONE",
          "name": "Modalità di visualizzazione",
          "description": "Modalità di visualizzazione",
          "multi": false,
          "status": [
            {
              "code": "MOSTRA",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [],
      "properties": [
        {
          "code": "DESCRIZIONE",
          "name": "Descrizione"
        },
        {
          "code": "NUM_INTESTATARI",
          "name": "Numero intestatari"
        }
      ]
    },
    {
      "name": "Numero intestatari conto",
      "description": "Widget numero intestatari ereditato da conto di addebito",
      "code": "CONTO_INTESTATARI",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [
        {
          "code": "LABEL",
          "name": "label",
          "description": "Label",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Categoria di identificazione",
      "description": "Widget categoria di identificazione",
      "code": "CAT_IDENTIFICAZIONE",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "VALIDAZIONE",
          "name": "Validazione",
          "description": "Validazione",
          "multi": false,
          "status": [
            {
              "code": "VALIDARE",
              "description": "Il widget/componente viene validato",
              "style": null
            },
            {
              "code": "NON_VALIDARE",
              "description": "Il widget/componente non viene validato",
              "style": null
            }
          ]
        },
        {
          "code": "IDENTIFICAZIONE",
          "name": "Metodologia identificazione",
          "description": "Metodologia identificazione",
          "multi": true,
          "status": [
            {
              "code": "BONIFICO",
              "description": "Il widget/componente prevede identificazione tramite bonifico",
              "style": null
            },
            {
              "code": "PERSONA",
              "description": "Il widget/componente prevede identificazione di persona",
              "style": null
            }
          ]
        },
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "IDENT_BONIFICO",
          "name": "bonifico",
          "description": "Identificazione tramite bonifico",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "IDENT_PERSONA",
          "name": "di persona",
          "description": "Identificazione di persona",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "IDENT_WEBCAM",
          "name": "webcam",
          "description": "Identificazione tramite webcam",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Modalita identificazione",
      "description": "Widget Modalita identificazione",
      "code": "MOD_IDENTIFICAZIONE",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "IDENTIFICAZIONE",
          "name": "Metodologia identificazione",
          "description": "Metodologia identificazione",
          "multi": true,
          "status": [
            {
              "code": "BONIFICO_1_DOCUMENTO",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "BONIFICO_2_DOCUMENTI",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "PERSONA",
              "description": "Il widget/componente prevede identificazione di persona",
              "style": null
            },
            {
              "code": "SELFIE_1_DOCUMENTO",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "SELFIE_2_DOCUMENTI",
              "description": "Il widget/componente viene mostrato",
              "style": null
            },
            {
              "code": "SELFIE_BONIFICO_DOCUMENTO",
              "description": "Il widget/componente viene mostrato",
              "style": null
            }
          ]
        },
        {
          "code": "CF_ANAGRAFE",
          "name": "Cf anagrafe",
          "description": "Cf gia presente in anagrafica",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "SELFIE_BONIFICO_DOCUMENTO",
          "name": "Selfie Bonifico Documento",
          "description": "Selfie, Bonifico e Documento",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "BONIFICO_2_DOCUMENTI",
          "name": "Bonifico 2 Documenti",
          "description": "Bonifico e 2 documenti",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "BONIFICO_1_DOCUMENTO",
          "name": "Bonifico 1 Documento",
          "description": "Bonifico e 1 documento",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "SELFIE_2_DOCUMENTI",
          "name": "Selfie 2 Documenti",
          "description": "Selfie e 2 documenti",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "SELFIE_1_DOCUMENTO",
          "name": "Selfie 1 Documento",
          "description": "Selfie e 1 documento",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "PERSONA",
          "name": "Persona",
          "description": "Di persona",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Bonifico",
      "description": "Widget bonifico",
      "code": "BONIFICO",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "GIA_CLIENTE",
          "name": "Gia cliente",
          "description": "verifica se utente gia cliente",
          "multi": false,
          "status": [
            {
              "code": "NASCONDI",
              "description": "Il widget/componente non viene mostrato",
              "style": null
            }
          ]
        }
      ],
      "components": [],
      "properties": [
        {
          "code": "IBAN",
          "name": "IBAN Bonifico"
        },
        {
          "code": "SERVIZIO",
          "name": "Codice servizio cellulare"
        }
      ]
    },
    {
      "name": "Attesa",
      "description": "Widget attesa",
      "code": "ATTESA",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [],
      "components": [],
      "properties": [
        {
          "code": "TEMPLATE",
          "name": "Codice invia mail"
        }
      ]
    },
    {
      "name": "Tipologia Carta",
      "description": "Widget Tipologia Carta",
      "code": "TIPOLOGIA_CARTA",
      "category": {
        "name": "Onboarding",
        "code": "ONBOARDING"
      },
      "configurations": [
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
            {
              "code": "NON_OBBLIGATORIO",
              "description": "Il widget/componente non e obbligatorio",
              "style": null
            },
            {
              "code": "OBBLIGATORIO",
              "description": "Il widget/componente e obbligatorio",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CARTA_FISICA",
          "name": "Carta Fisica",
          "description": "radio carta fisica",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        },
        {
          "code": "CARTA_VIRTUALE",
          "name": "Carta Virtuale",
          "description": "radio carta virtuale",
          "properties": [
            {
              "code": "SELECTED"
            }
          ]
        }
      ],
      "properties": []
    }
  ]
}// JavaScript Document
