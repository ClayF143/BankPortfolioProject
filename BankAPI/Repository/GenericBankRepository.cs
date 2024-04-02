using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BankAPI.Repository
{
    public interface IBankRepository<TEntity>
        where TEntity : class
    {
        Task<List<TEntity>> GetAll(params string[] includes);
        Task<TEntity?> Get(int id);
        Task<List<TEntity>> Get(Expression<Func<TEntity, bool>> predicate, params string[] includes);
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

        public async Task<List<TEntity>> GetAll(params string[] includes)
        {
            var query = Table.AsQueryable();
            foreach(var include in includes)
            {
                query = query.Include(include);
            }
            return await query.ToListAsync();
        }

        public async Task<TEntity?> Get(int id) =>
            await Table.FindAsync(id);

        public async Task<List<TEntity>> Get(Expression<Func<TEntity, bool>> predicate, params string[] includes)
        {
            var query = Table.AsQueryable();
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return await query.Where(predicate).ToListAsync();
        }

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
