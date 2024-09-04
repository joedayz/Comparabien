using System;
using ConcentradorBackend.Interfaces;
using ConcentradorBackend.Models;

namespace ConcentradorBackend.DataAccess
{
    public class ProspectoDataAccessLayer: IProspectoService
    {
        private readonly ConcentradorDBContext _dbContext;
        readonly IProspectoService _prospectoService;

        
        public ProspectoDataAccessLayer(ConcentradorDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public int AddProspecto(Prospecto prospecto)
        {
            try
            {
                _dbContext.Prospecto.Add(prospecto);
                _dbContext.SaveChanges();

                return 1;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}