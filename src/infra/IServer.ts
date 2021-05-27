export default interface IServer
{
    initialize(): Promise<void>
    connect(): Promise<void>
    getEngine(): any
}