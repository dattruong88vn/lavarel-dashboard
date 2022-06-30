import React, { useState } from "react";
import Form from "@rjsf/core";
import InputAutoSuggestWidget from "./InputAutoSuggestWidget";

const FormContractContainer = () => {
  const schema = {
    "type": "object",
    "properties": {
      "a": {
        "title": "",
        "type": "object",
        "properties": {
          "contract-pre": {
            "title": "HĐ của Pre-listing",
            "type": "string"
          },
          "contract-number": {
            "title": "Số HĐ",
            "type": "string",
            "default": ""
          }
        }
      },
      "b": {
        "type": "object",
        "title": "I. PHIẾU YÊU CẦU",
        "properties": {
          "3": {
            "type": "object",
            "title": "3. Dịch vụ",
            "properties": {
              "items": {
                  "title": "3.1 Loại dịch vụ",
                  "type": "object",
                  "anyOf": [
                    {
                      "title": "Mua",
                      "properties": {
                        "firstName": {
                          "type": "string",
                          "title": "First name",
                          "default": "Chuck"
                        },
                        "lastName": {
                          "type": "string",
                          "title": "Last name"
                        }
                      }
                    },
                    {
                      "title": "Thuê",
                      "properties": {
                        "idCode": {
                          "type": "string",
                          "title": "ID code"
                        }
                      }
                    }
                  ]
              }
            }
          }
        }
      }
    }
  }

  const uiSchema = {
    "a": {
      "contract-pre": {
        "classNames": "col-md-6",
        "ui:widget": InputAutoSuggestWidget,
      },
      "contract-number": {
        "classNames": "col-md-6"
      }
    },
    "b": {
      "3": {
        "items": {
          "ui:widget": "radio",
          "ui:options": {
            "inline": true
          }
        }
      }
    }
  }


  return (<>
    <Form schema={schema}
      rootSchema="form-schema"
      uiSchema={uiSchema}
      onChange={(e) => {
        console.log(e.formData)
      }}
      onSubmit={e => {
        console.log(e.formData)
      }}
      onBlur={e => {
        console.log(e)
      }}
      onError={() => { console.log('err') }} >
      <button type="submit" className="btn btn-success">Lưu</button>
      <button className="btn btn-default">View only</button>
    </Form>
  </>);
}

export default FormContractContainer;