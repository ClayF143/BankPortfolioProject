using BankAPI.Entities.Tables;
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
        public List<TEntity> GetAll() => Repository.GetAll().Result;

        [HttpGet("{id}")]
        [Authorize]
        public TEntity? Get(int id) => Repository.Get(id).Result;

        [HttpPost]
        [Authorize]
        public void Add([FromBody] TEntity value) => Repository.Add(value);

        [HttpPut("{id}")]
        [Authorize]
        public void Update(int id, [FromBody] TEntity value) => Repository.Update(value);

        [HttpDelete("{id}")]
        [Authorize]
        public void Delete(int id) => Repository?.Delete(id);
    }
}
