using BankAPI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.BuisinessLogic
{
    public interface IBankBusinessLogic<TEntity> where TEntity: class
    {
        Task<List<TEntity>> GetAll();
        Task<TEntity?> Get(int id);
        Task Add(TEntity value);
        Task Update(TEntity value);
        Task Delete(int id);
    }

    public abstract class GenericBankBusinessLogic<TEntity>: IBankBusinessLogic<TEntity> where TEntity : class
    {
        protected IBankRepository<TEntity> Repository { get; }

        public GenericBankBusinessLogic(IBankRepository<TEntity> repository)
        {
            Repository = repository;
        }

        public virtual async Task<List<TEntity>> GetAll() => await Repository.GetAll();

        public virtual async Task<TEntity?> Get(int id) => await Repository.Get(id);

        public virtual async Task Add(TEntity value) => await Repository.Add(value);

        public virtual async Task Update(TEntity value) => await Repository.Update(value);

        public virtual async Task Delete(int id) => await Repository.Delete(id);
    }
}
