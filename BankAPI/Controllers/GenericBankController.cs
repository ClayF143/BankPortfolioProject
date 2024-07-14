using BankAPI.BuisinessLogic;
using Microsoft.AspNetCore.Mvc;

namespace BankAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public abstract class GenericBankController<TEntity, TBL> : ControllerBase
        where TEntity : class
        where TBL : IBankBusinessLogic<TEntity>
    {
        protected TBL BL { get; set; }

        public GenericBankController(TBL bl)
        {
            BL = bl;
        }

        [HttpGet]
        public virtual async Task<List<TEntity>> GetAll() => await BL.GetAll();

        [HttpGet("{id}")]
        public virtual async Task<TEntity?> Get(int id) => await BL.Get(id);

        [HttpPost]
        public virtual async Task Add([FromBody] TEntity value) => await BL.Add(value);

        [HttpPut("{id}")]
        public virtual async Task Update(int id, [FromBody] TEntity value) => await BL.Update(value);

        [HttpDelete("{id}")]
        public virtual async Task Delete(int id) => await BL.Delete(id);
    }
}
