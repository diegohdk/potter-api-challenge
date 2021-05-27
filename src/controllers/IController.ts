export default interface IController<RepositoryType>
{
    setRepository(repo: RepositoryType): void
}