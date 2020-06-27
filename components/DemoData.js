const data ={
  "AddDataRoutes":  [
     {
      "Url": "Store/emp",
      "id": 0,
      "method": "GET",
      "models_req":  [
        "Employee",
      ],
    },
     {
      "Url": "Store/task",
      "id": 1,
      "method": "POST",
      "models_req":  [
        "Task",
      ],
    },
  ],
  "Databaseinfo":  {
    "Db": "Demodb",
    "Host": "localhost",
    "Num_tables": "2",
    "Password": "12345",
    "User": "Root",
  },
  "DeleteDataRoutes":  [
     {
      "Url": "Update/emp",
      "given":  [
         {
          "field": "Empid",
          "model": "Employee",
        },
      ],
      "id": 0,
      "method": "POST",
      "set":  [
         {
          "field": "Salary",
          "model": "Employee",
        },
         {
          "field": "Empname",
          "model": "Employee",
        },
      ],
    },
     {
      "Url": "Update/task",
      "given":  [
         {
          "field": "Tasktype",
          "model": "Task",
        },
      ],
      "id": 1,
      "method": "POST",
      "set":  [
         {
          "field": "Taskassignedto",
          "model": "Task",
        },
         {
          "field": "Tasktime",
          "model": "Task",
        },
      ],
    },
  ],
  "Models":  [
     {
      "Fields":  [
         {
          "Constraints":  [
            "Primary Key",
          ],
          "Datatype": "Integer",
          "FieldName": "Empid",
          "default": "None",
          "id": "0",
        },
         {
          "Constraints":  [
            "Not Null",
          ],
          "Datatype": "Decimal",
          "FieldName": "Salary",
          "default": "0.00",
          "id": "2",
        },
         {
          "Constraints":  [
            "Not Null",
          ],
          "Datatype": "Text",
          "FieldName": "Empname",
          "default": "",
          "id": "1",
        },
      ],
      "TableName": "Employee",
      "id": 0,
    },
     {
      "Fields":  [
         {
          "Constraints":  [
            "Primary Key",
          ],
          "Datatype": "Integer",
          "FieldName": "Tasktype",
          "default": "None",
          "id": "0",
        },
         {
          "Constraints":  [
            "Unique",
            "Not Null",
          ],
          "Datatype": "Text",
          "FieldName": "Taskassignedto",
          "default": "None",
          "id": "1",
        },
         {
          "Constraints":  [
            "Not Null",
          ],
          "Datatype": "Decimal",
          "FieldName": "Tasktime",
          "default": "0.00",
          "id": "2",
        },
      ],
      "TableName": "Task",
      "id": 1,
    },
  ],
  "ProjectName": "DemoProject",
  "QueryDataRoutes":  [
     {
      "Url": "Get/emp",
      "given":  [
         {
          "field": "Empid",
          "model": "Employee",
        },
      ],
      "id": 0,
      "method": "GET",
      "query":  [
         {
          "field": "Salary",
          "model": "Employee",
        },
         {
          "field": "Empname",
          "model": "Employee",
        },
      ],
    },
     {
      "Url": "Get/task",
      "given":  [
         {
          "field": "Tasktype",
          "model": "Task",
        },
      ],
      "id": 1,
      "method": "GET",
      "query":  [
         {
          "field": "Taskassignedto",
          "model": "Task",
        },
         {
          "field": "Tasktime",
          "model": "Task",
        },
      ],
    },
  ],
  "UpdateDataRoutes":  [
     {
      "Url": "Delete/emp",
      "delete":  [],
      "given":  [
         {
          "field": "Empid",
          "model": "Employee",
        },
      ],
      "id": 0,
      "method": "GET",
    },
     {
      "Url": "Delete/task",
      "delete":  [],
      "given":  [
         {
          "field": "Tasktype",
          "model": "Task",
        },
      ],
      "id": 1,
      "method": "GET",
    },
     {
      "Url": "Delete/emp/all",
      "delete":  [],
      "given":  [],
      "id": 2,
      "method": "GET",
    },
  ],
}
export default data;