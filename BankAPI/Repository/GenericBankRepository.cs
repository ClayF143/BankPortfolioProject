using Microsoft.EntityFrameworkCore;

namespace BankAPI.Repository
{
    public interface IBankRepository<TEntity>
        where TEntity : class
    {
        Task<List<TEntity>> GetAll();
        Task<TEntity?> Get(int id);
        Task<List<TEntity>> GetAllUntracked();
        Task<TEntity> Add(TEntity entity);
        Task<TEntity> Update(TEntity entity);
        Task Delete(int id);
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

        public virtual async Task<List<TEntity>> GetAll() =>
            await Table.ToListAsync();

        public virtual async Task<TEntity?> Get(int id) =>
            await Table.FindAsync(id);

        public async Task<List<TEntity>> GetAllUntracked() =>
            await Table.AsNoTracking().ToListAsync();

        public async Task<TEntity> Add(TEntity entity)
        {
            Table.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            context.Update(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(int id)
        {
            var entity = await Get(id);
            if (entity != null)
            {
                Table.Remove(entity);
                await context.SaveChangesAsync();
            }
        }
    }
}
