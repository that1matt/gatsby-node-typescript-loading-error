import { GatsbyNode, Node } from 'gatsby';

import forms from './src/form.json';

const TYPE_PREFIX = 'Default';
const FORM_TYPE = `${TYPE_PREFIX}Form`;
const FIELD_TYPE = `${FORM_TYPE}Field`;

const sourceNodes: GatsbyNode['sourceNodes'] = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  forms.map((form: { [x: string]: any; id?: any; childFields?: any; }) => {
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
          parent: formNode as unknown as Node,
          child: fieldNode,
        });
      });
    }
  });

  return;
};

export { sourceNodes };
