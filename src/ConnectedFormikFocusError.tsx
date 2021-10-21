import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import { FormikFocusError } from './FormikFocusError';

/**
 * A component that connects to Formik context and passes context state to `FormikFocusError` component.
 * */
export const ConnectedFormikFocusError: FC = () => {
    const { isSubmitting, isValidating, touched, errors } = useFormikContext();

    return (
        <FormikFocusError
            isSubmitting={isSubmitting}
            isValidating={isValidating}
            touched={touched}
            errors={errors}
        />
    );
};
