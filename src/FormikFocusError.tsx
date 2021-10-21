import { FC, useEffect } from 'react';
import { FormikTouched, FormikErrors, FormikValues, getIn } from 'formik';
import flattenKeys from './utils/flattenKeys';

export type FormikFocusErrorProps = {
    isSubmitting: boolean;
    isValidating: boolean;
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
};

/**
 * A component that implements scrolling to the 'first' touched field with error.
 * 'First' field is determined as the first key within `touched` object.
 * */
export const FormikFocusError: FC<FormikFocusErrorProps> = (props) => {
    const { isSubmitting, isValidating, touched, errors } = props;

    useEffect(() => {
        if (!isSubmitting || isValidating || typeof document === 'undefined') {
            return;
        }

        const touchedFields = flattenKeys(touched);
        const touchedFieldsWithErrors = Object.keys(touchedFields).filter((field) =>
            getIn(errors, field),
        );
        let errorElement: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null = null;
        let errorNameIndex = 0;

        while (errorNameIndex < touchedFieldsWithErrors.length && !errorElement) {
            errorElement = document.querySelector(
                `[name="${touchedFieldsWithErrors[errorNameIndex++]}"]`,
            );
        }

        // Timeout required to avoid issues with browser autofocus
        setTimeout(() => {
            if (errorElement) {
                // Unable to focus hidden or disabled input. Trying to scroll its parent into view.
                if (errorElement.type === 'hidden' || errorElement.disabled) {
                    errorElement.parentElement?.scrollIntoView({
                        block: 'center',
                    });
                } else {
                    errorElement.focus();
                }
            }
        });
    }, [isSubmitting, isValidating, errors, touched]);

    return null;
};
