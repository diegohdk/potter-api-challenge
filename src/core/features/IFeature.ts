/**
 * Base feature interface.
 */
export default interface IFeature
{
    execute(...args: any[]): any | void
}