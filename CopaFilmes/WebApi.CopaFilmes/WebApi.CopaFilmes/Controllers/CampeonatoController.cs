using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.CopaFilmes.Models;

namespace WebApi.CopaFilmes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampeonatoController : ControllerBase
    {
        /// <summary>
        /// Método responsavel por gerar o campeonato de Filmes
        /// </summary>
        /// <param name="filmes">Lista de Filmes</param>
        /// <returns>Filme vencedore e vice-campeão</returns>
        [HttpPost]
        public IActionResult ProcessarCampeonato([FromBody] List<Filme> filmes)
        {
            List<Filme> FilmesFase = filmes.OrderBy(f => f.Titulo).ToList();

            if (FilmesFase.Count !=  8)
                return BadRequest();

            List<Filme> VencedoresFase = new List<Filme>();

            while (FilmesFase.Count > 2)
            {
                for (int i = 0; i < (FilmesFase.Count() / 2); i++)
                {
                    if (FilmesFase[i].Nota > FilmesFase[FilmesFase.Count() - i - 1].Nota)
                        VencedoresFase.Add(FilmesFase[i]);
                    else
                        VencedoresFase.Add(FilmesFase[FilmesFase.Count() - i - 1]);
                }

                FilmesFase = VencedoresFase;

                VencedoresFase = new List<Filme>();

            }

            Podium Final = new Podium()
            {
                Vencedor = FilmesFase.OrderBy(f => f.Nota).LastOrDefault(),
                Vice = FilmesFase.OrderBy(f => f.Nota).FirstOrDefault()
            };

            return Ok(Final);
        }

    }
}