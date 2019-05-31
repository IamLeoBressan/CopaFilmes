using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.CopaFilmes.Models
{
    public class Podium
    {
        public Filme Vencedor { get; set; }
        public Filme Vice { get; set; }
    }
}
