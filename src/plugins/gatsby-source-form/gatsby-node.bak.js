const currentFormData = [
  {
    id: "1",
    name: "Name",
    description: "description",
    createdAt: "2022-09-08T22:18:12Z+0000",
    updatedAt: "2022-12-15T02:22:37Z+0000",
    url: "https://google.com",
    status: "approved",
    theme: "simple:",
    language: "English",
    locale: "en_US",
    progressiveProfiling: false,
    labelPosition: "left",
    fontFamily: "Arial",
    fontSize: "12px",
    folder: {
      type: "Folder",
      value: 174,
      folderName: "Forms"
    },
    knownVisitor: {
      type: "form",
      template: null
    },
    thankYouList: [
      {
        followupType: "none",
        followupValue: null,
        default: true
      }
    ],
    buttonLocation: 165,
    buttonLabel: "Unsubscribe",
    waitingLabel: "Please Wait",
    workSpaceId: 1,
    childFields: [
      {
        id: "Email",
        label: "Email Address:",
        labelWidth: 146,
        fieldWidth: 342,
        dataType: "email",
        validationMessage: "Must be valid email. <span class=\"mktoErrorDetail\">example@yourdomain.com</span>",
        rowNumber: 0,
        columnNumber: 0,
        required: true,
        formPrefill: true,
        visibilityRules: {
          ruleType: "alwaysShow"
        },
        apiId: "email"
      },
      {
        id: "Unsubscribed",
        label: "Unsubscribe",
        dataType: "hidden",
        rowNumber: 1,
        columnNumber: 0,
        required: false,
        autoFill: {
          value: "Yes",
          valueFrom: "default",
          parameterName: ""
        },
        apiId: "unsubscribed"
      }
    ]
  }
];

const TYPE_PREFIX = 'Default';
const FORM_TYPE = `${TYPE_PREFIX}Form`;
const FIELD_TYPE = `${FORM_TYPE}Field`;

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  currentFormData.map(form => {
    const { childFields, ...formData } = form;
    const formId = `${form.id}`;
    const formDataId = `${formData.id}`;
    const formNode = {
      ...formData,
      marketoId: formDataId,
      id: createNodeId(formDataId),
      parent: null,
      children: [],
      internal: {
        type: FORM_TYPE,
        content: JSON.stringify(formData),
        contentDigest: createContentDigest(formData),
      },
    };

    createNode(formNode);

    if (childFields) {
      childFields.map(field => {
        const fieldId = `${field.id}`;
        const fieldNode = {
          ...field,
          marketoId: fieldId,
          id: createNodeId(`${fieldId}_${formId}`),
          parent: formId,
          children: [],
          internal: {
            type: FIELD_TYPE,
            content: JSON.stringify(field),
            contentDigest: createContentDigest(field),
          },
        };

        createNode(fieldNode);
        // create the parent/child relationship, such that `children[]` on the FormNode are our form fields.
        createParentChildLink({
          parent: formNode,
          child: fieldNode,
        });
      });
    }
  });

  return;
};
