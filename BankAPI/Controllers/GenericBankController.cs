using BankAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public abstract class GenericBankController<TEntity> : ControllerBase
        where TEntity : class
    {
        protected IBankRepository<TEntity> Repository { get; }

        public GenericBankController(IBankRepository<TEntity> repository)
        {
            Repository = repository;
        }

        [HttpGet]
        public virtual async Task<List<TEntity>> GetAll() => await Repository.GetAll();

        [HttpGet("{id}")]
        public virtual async Task<TEntity?> Get(int id) => await Repository.Get(id);

        [HttpPost]
        public virtual async Task Add([FromBody] TEntity value) => await Repository.Add(value);

        [HttpPut("{id}")]
        public virtual async Task Update(int id, [FromBody] TEntity value) => await Repository.Update(value);

        [HttpDelete("{id}")]
        public virtual async Task Delete(int id) => await Repository.Delete(id);
    }
}
