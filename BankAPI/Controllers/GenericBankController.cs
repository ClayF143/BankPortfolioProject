using BankAPI.Entities.Tables;
using BankAPI.Repository;
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
        public List<TEntity> Get() => Repository.Get().Result;

        [HttpGet("{id}")]
        public TEntity? Get(int id) => Repository.Get(id).Result;

        [HttpPost]
        public void Post([FromBody] TEntity value) => Repository.Add(value);

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] TEntity value) => Repository.Update(value);

        [HttpDelete("{id}")]
        public void Delete(int id) => Repository?.Delete(id);
    }
}
