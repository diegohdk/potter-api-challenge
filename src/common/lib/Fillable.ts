/**
 * A class that is fillable.
 */
export default class Fillable
{
    /**
     * Fills the instance with values from the given collection.
     *
     * @param {object} values Source collection.
     */
    fill(values: object)
    {
        Object.entries(values).forEach((entry: [string, any]) => {
            if (typeof this[entry[0]] !== 'undefined') {
                this[entry[0]] = entry[1];
            }
        });
    }

    /**
     * Exports the current object into a new raw object.
     *
     * @param {string[]} skip Keys to skip on the exported object.
     *
     * @returns {object} Exported object.
     */
    export(skip: string[] = []): object
    {
        const data = {};

        Object.entries(this).forEach((entry: [string, any]) => {
            if (!skip.includes(entry[0])) {
                data[entry[0]] = entry[1];
            }
        });

        return data;
    }
}