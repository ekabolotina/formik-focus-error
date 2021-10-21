import isPlainObject from 'lodash/isPlainObject';

function flatten(object: unknown, path = ''): Record<string, unknown> {
    if (isPlainObject(object)) {
        const typedObject = object as Record<string, unknown>;
        const keys = Object.keys(typedObject);
        const result: Record<string, unknown> = {};

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            Object.assign(result, flatten(typedObject[key], path ? `${path}.${key}` : key));
        }

        return result;
    }

    if (Array.isArray(object)) {
        const result: Record<string, unknown> = {};

        for (let i = 0; i < object.length; i++) {
            const key = `[${i}]`;

            Object.assign(result, flatten(object[i], path ? `${path}${key}` : key));
        }

        return result;
    }

    if (!path) {
        return {};
    }

    return {
        [path]: object,
    };
}

/**
 * Flattens nested objects into record.
 *
 * @param object The object to be flattened.
 *
 * @returns Record, where keys represent the full dot-separated path in original object.
 * */
export default function flattenKeys(object: Record<string, unknown>): Record<string, unknown> {
    return flatten(object);
}
