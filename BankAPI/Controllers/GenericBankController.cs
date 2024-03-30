using BankAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    public abstract class GenericBankController<TEntity> : ControllerBase
        where TEntity : class
    {
        private IBankRepository<TEntity> Repository { get; }

        public GenericBankController(IBankRepository<TEntity> repository)
        {
            Repository = repository;
        }

        [HttpGet]
        [Authorize]
        public async Task<List<TEntity>> GetAll() => await Repository.GetAll();

        [HttpGet("{id}")]
        [Authorize]
        public async Task<TEntity?> Get(int id) => await Repository.Get(id);

        [HttpPost]
        [Authorize]
        public async Task Add([FromBody] TEntity value) => await Repository.Add(value);

        [HttpPut("{id}")]
        [Authorize]
        public async Task Update(int id, [FromBody] TEntity value) => await Repository.Update(value);

        [HttpDelete("{id}")]
        [Authorize]
        public async Task Delete(int id) => await Repository.Delete(id);
    }
}
