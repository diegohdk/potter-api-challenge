export default interface IServer
{
    initialize(): Promise<void>
    connect(): Promise<void>
    isConnected(): boolean
    getEngine(): any
}