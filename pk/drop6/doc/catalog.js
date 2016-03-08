{
  "status": "OK",
  "message": null,
  "data": [
    {
      "name": "Bundle prodotto",
      "description": "Widget Bundle prodotto",
      "code": "BUNDLE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [
        {
          "code": "PRIMO_INTESTATARIO",
          "name": "Primo intestatario",
          "description": "Vincolo sul primo intestatario",
          "multi": false,
          "status": [
            {
              "code": "NO_PRIMO_INTESTATARIO",
              "description": "Il widget/componente non ha il vincolo primo intestatario",
              "style": null
            },
            {
              "code": "PRIMO_INTESTATARIO",
              "description": "Il widget/componente ha il vincolo primo intestatario",
              "style": null
            }
          ]
        }
      ],
      "components": [
        {
          "code": "CODICE_PRODOTTO",
          "name": "codice prodotto",
          "description": "Codice prodotto",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "NOME_PRODOTTO",
          "name": "nome prodotto",
          "description": "nome prodotto",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "IMMAGINE_PRODOTTO",
          "name": "immagine prodotto",
          "description": "immagine prodotto",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        },
        {
          "code": "DESCR_PRODOTTO",
          "name": "descrizione prodotto",
          "description": "descrizione prodotto",
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
      "name": "Interessi conto corrente",
      "description": "Widget interessi conto corrente",
      "code": "INTERESSI_CC",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [],
      "components": [
        {
          "code": "INTERESSI",
          "name": "interessi",
          "description": "flag interessi conto corrente",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": []
    },
    {
      "name": "Documentazione informativa",
      "description": "Widget di documentazione informativa",
      "code": "DOCUMENTAZIONE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [],
      "components": [
        {
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "CODICE_BANCA",
          "name": "Codice banca"
        },
        {
          "code": "CODICE_PRODOTTO",
          "name": "Codice Prodotto"
        },
        {
          "code": "DESCR_PRODOTTO",
          "name": "Descrizione Prodotto"
        },
        {
          "code": "DESCR_PRODOTTO_2",
          "name": "Descrizione Prodotto 2"
        },
        {
          "code": "DESCR_PRODOTTO_3",
          "name": "Descrizione Prodotto 3"
        },
        {
          "code": "DESCR_PRODOTTO_4",
          "name": "Descrizione Prodotto 4"
        },
        {
          "code": "LINK",
          "name": "Link documentazione"
        },
        {
          "code": "LINK_2",
          "name": "Link documentazione 2"
        },
        {
          "code": "LINK_3",
          "name": "Link documentazione 3"
        },
        {
          "code": "LINK_4",
          "name": "Link documentazione 4"
        },
        {
          "code": "NOME_PRODOTTO",
          "name": "Nome Prodotto"
        },
        {
          "code": "NOME_PRODOTTO_2",
          "name": "Nome Prodotto 2"
        },
        {
          "code": "NOME_PRODOTTO_3",
          "name": "Nome Prodotto 3"
        },
        {
          "code": "NOME_PRODOTTO_4",
          "name": "Nome Prodotto 4"
        }
      ]
    },
    {
      "name": "Cronistoria rapporti",
      "description": "Widget consenso cronistoria rapporti",
      "code": "CRONISTORIA",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
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
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
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
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "LINK",
          "name": "Link documentazione"
        }
      ]
    },
    {
      "name": "Promozione prodotti",
      "description": "Widget consenso promozione prodotti banca",
      "code": "PROMOZIONE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
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
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
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
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "LINK",
          "name": "Link documentazione"
        }
      ]
    },
    {
      "name": "Promozione prodotti terzi",
      "description": "Widget consenso promozione prodotti terzi",
      "code": "PROMOZIONE_TERZI",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
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
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
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
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "LINK",
          "name": "Link documentazione"
        }
      ]
    },
    {
      "name": "Profilazione",
      "description": "Widget consenso profilazione",
      "code": "PROFILAZIONE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
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
          "code": "UTENTE_LOGGATO",
          "name": "Cliente loggato",
          "description": "Cliente loggato",
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
          "code": "VISIONE",
          "name": "visione",
          "description": "flag di presa visione",
          "properties": [
            {
              "code": "CHECKED"
            }
          ]
        }
      ],
      "properties": [
        {
          "code": "LINK",
          "name": "Link documentazione"
        }
      ]
    },
    {
      "name": "Scelta Succursale",
      "description": "Widget scelta succursale",
      "code": "SUCCURSALE",
      "category": {
        "name": "Catalogo prodotti",
        "code": "CATALOGO"
      },
      "configurations": [
        {
          "code": "OBBLIGATORIETA",
          "name": "Obbligatorieta",
          "description": "Obbligatorieta",
          "multi": false,
          "status": [
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
          "code": "SUCCURSALE",
          "name": "succursale",
          "description": "succursale",
          "properties": [
            {
              "code": "VALUE"
            }
          ]
        }
      ],
      "properties": []
    }
  ]
}// JavaScript Document
