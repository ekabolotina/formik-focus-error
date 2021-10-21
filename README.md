# formik-focus-error

A component that implements scrolling to the first field with error.
This component is meant to be used alongside with [formik](https://formik.org/).

* Depends only on `lodash`;
* Can be used either inside formik context or anywhere;
* Works with disabled or hidden fields;
* Written in Typescript.

> Please note: _first field with error_ is not actually the first field on the screen.
> It is just the first key within `errors` object.

## Usage inside `Formik`

Just render `ConnectedFormikFocusError` component inside `Formik` 
and it will do all the job for you: 

```tsx
import React, { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import { ConnectedFormikFocusError } from 'formik-focus-error';

export const MyForm: FC = () => {
    return (
        <Formik>
            <Form>
                <Field name="name" type="text" />
                <Field name="email" type="email" />
                <button type="submit">Submit</button>
                <ConnectedFormikFocusError />
            </Form>
        </Formik>
    );
};
```

## Usage with any formik instance

Pass `isSubmitting`, `isValidating`, `touched`, `errors` 
from formik context to `FormikFocusError` component and render it anywhere on the page:

```tsx
import React, { FC } from 'react';
import { Form, Field, useFormik } from 'formik';
import { FormikFocusError } from 'formik-focus-error';

export const MyForm: FC = () => {
    const { handleSubmit, errors, touched, isValidating, isSubmitting } = useFormik(/* config */);

    return (
        <Form onSubmit={handleSubmit}>
            <Field name="name" type="text" />
            <Field name="email" type="email" />
            <button type="submit">Submit</button>
            <FormikFocusError
                errors={errors}
                touched={touched}
                isValidating={isValidating}
                isSubmitting={isSubmitting}
            />
        </Form>
    );
};
```
