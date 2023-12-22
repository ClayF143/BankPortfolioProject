using Microsoft.EntityFrameworkCore;

namespace BankAPI.Repository
{
    public interface IBankRepository<TEntity>
        where TEntity : class
    {
        Task<List<TEntity>> Get();
        Task<TEntity?> Get(int id);
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(int id);
    }

    public abstract class GenericBankRepository<TEntity, TContext> : IBankRepository<TEntity>
        where TEntity : class
        where TContext : DbContext
    {
        private TContext context;
        internal DbSet<TEntity> Table { get => context.Set<TEntity>(); }

        public GenericBankRepository(TContext context)
        {
            this.context = context;
        }

        public async Task<List<TEntity>> Get() =>
            await Table.ToListAsync();

        public async Task<TEntity?> Get(int id) =>
            await Table.FindAsync(id);

        public async void Add(TEntity entity)
        {
            try
            {
                Table.Add(entity);
                await context.SaveChangesAsync();
            }
            catch { throw; }
        }

        public async void Update(TEntity entity)
        {
            try
            {
                context.Update(entity);
                await context.SaveChangesAsync();
            }
            catch { throw; }
        }

        public async void Delete(int id)
        {
            try
            {
                var entity = await Get(id);
                if (entity != null)
                {
                    Table.Remove(entity);
                    await context.SaveChangesAsync();
                }
            }
            catch { throw; }
        }
    }
}
