const DemoData = {
    "Models":  [
       {
        "Fields":  [
           {
            "Constraints":  [
              "Primary Key",
            ],
            "Datatype": "Integer",
            "FieldName": "Main",
            "default": "None",
            "id": "0",
          },
        ],
        "TableName": "A",
        "id": 0,
      },
       {
        "Fields":  [
           {
            "Constraints":  [
              "Primary Key",
            ],
            "Datatype": "Integer",
            "FieldName": "Id",
            "default": "None",
            "id": "0",
          },
           {
            "Constraints":  [
              "Not Null",
            ],
            "Datatype": "Date",
            "FieldName": "Date",
            "default": "None",
            "id": "1",
          },
        ],
        "TableName": "B",
        "id": 1,
      },
       {
        "Fields":  [
           {
            "Constraints":  [
              "Primary Key",
            ],
            "Datatype": "Integer",
            "FieldName": "Is",
            "default": "None",
            "id": "0",
          },
           {
            "Constraints":  [
              "Unique",
              "Not Null",
            ],
            "Datatype": "Text",
            "FieldName": "Name",
            "default": "None",
            "id": "1",
          },
           {
            "Constraints":  [
              "Unique",
              "Not Null",
            ],
            "Datatype": "Decimal",
            "FieldName": "Version",
            "default": "0.0",
            "id": "2",
          },
        ],
        "TableName": "C",
        "id": 2,
      },
    ]
}
export default DemoData;