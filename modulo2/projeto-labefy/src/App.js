import react from 'react'
import { PaginaCriaçao } from './components/PaginaCriaçao';
import { PaginaLista } from './components/PaginaLista';
import { PaginaMusicas } from './components/PaginaMusicas';
import { Div, Header, PaginaToda } from './components/Style';
import axios from 'axios';
import { urlDefault } from './Url/Urls'


class App extends react.Component {

   state = {

      musicas: [],

      playlist: [],

      paginas: 'paginaLista',
      nomeDaPlaylist: "",
      nomeCriaPlaylist: ""
   }

   componentDidMount() {

      this.getAllPlaylists()

   }

   pegarInput=(event)=> {

      this.setState({ nomeCriaPlaylist: event.target.value })

   }


   getAllPlaylists = () => {
      const url = urlDefault
      const axiosConfiguraçao = { headers: { Authorization: 'vinicius-cicone-vaughan' } }
      axios
         .get(url, axiosConfiguraçao)
         .then((respostaPositiva) => {
            this.setState({ playlist: respostaPositiva.data.result.list })
         })
         .catch((erro) => {
            console.log("algo deu errado ao pegar playlists")
            console.log(erro.data)
         })
   }

   addPlaylist = () => {
      const url = urlDefault
      const body = {
         name : this.state.nomeCriaPlaylist
      }
      const axiosConfiguraçao = { headers: { Authorization: 'vinicius-cicone-vaughan' } }
      axios
         .post(url, body, axiosConfiguraçao)
         .then((respostaPositiva) => {
            alert('playlist criada com sucesso !')
            this.getAllPlaylists()
         })
         .catch((erro) => {
            alert('Erro veja se nao ha uma outra playlist com mesmo nome ou contate o suporte tecnico')
            console.log("algo deu errado ao criar a playlists")
            console.log(erro.data)
         })
   }



   getAllTracks = (id, nome) => {

      
      const url = `${urlDefault}${id}/tracks`
      const axiosConfiguraçao = { headers: { Authorization: 'vinicius-cicone-vaughan' } }

      axios
         .get(url, axiosConfiguraçao)
         .then((respostaPositiva) => {
            console.log("Deu certo")
            this.setState({ nomeDaPlaylist: nome })
            this.setState({ musicas: respostaPositiva.data.result.tracks })
            console.log(respostaPositiva)

         })
         .catch((erro) => {
            console.log("algo deu errado ao pegar as musicas")
            console.log(erro.data)
         })
   }

   deletePlaylist = (id, name) => {
      const confirmaçao = window.confirm(`Tem certeza que voce quer apagar a playlist ${name}`)
      if (confirmaçao === true) {


         const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`
         const axiosConfiguraçao = { headers: { Authorization: 'vinicius-cicone-vaughan' } }

         axios.delete(url, axiosConfiguraçao)
            .then((respostaPositiva) => {
               alert(`playlist ${name} deletada`)
               this.getAllPlaylists()
            })
            .catch((erro) => {
               console.log("algo deu errado veja o console")
               console.log(erro)
            })

      } else {
         alert('Voce nao deletou')
      }
   }

   Navegar = () => {

      if (this.state.paginas === 'paginaCriacao') {

         return <PaginaCriaçao 
            value={this.state.nomeCriaPlaylist}
            onChange={this.pegarInput}
            criar={ this.addPlaylist }
         />

      } else if (this.state.paginas === 'paginaLista') {

         return this.paginaLista()

      } else if (this.state.paginas === 'paginaMusicas') {

         return <PaginaMusicas
            div={this.listaMusicas()}

         />
      }
   }

   listaMusicas = (id) => {

      const lista_de_musicas = this.state.musicas.map((item, x) => {

         return (
            <div key={x}>
              Nome: {item.name} Artista : {item.artist} 

               <button onClick={''}>XX</button>
            </div>
         )
      })
      return lista_de_musicas

   }


   paginaMusicas = () => {

      return this.setState({ paginas: 'paginaMusicas' })

   }

   mudaPaginas = () => {

      if (this.state.paginas) {
         return this.setState({ paginas: 'paginaCriacao' })
      }
   }


   paginaLista = (id) => {

      const lista_de_playlist = this.state.playlist.map((item, x) => {

         return (
            <div key={x}>
               <hr />
               <PaginaLista
                  lista={item.name}
                  paginaMusicas={() => this.getAllTracks(item.id, item.name)}

               /> <button /* onClick={'() => this.deletePlaylist(item.id, item.name)'} */>APAGAR</button>
            </div>
         )
      })
      return lista_de_playlist
   }



   render() {
      console.log(this.state.nomeCriaPlaylist)
      return (
         <PaginaToda>
            <Div className='botoes'>
               <button onClick={() => this.mudaPaginas()} > CRIA PLAYLIST</button>
               <button onClick={() => this.setState({ paginas: 'paginaLista' })} > PLAYLISTS</button>
               <button onClick={ () => this.setState({ paginas: 'paginaMusicas' }) } >LISTA DE MUSICA ATUAL</button><div></div><div >Voce esta na lista: {this.state.nomeDaPlaylist} </div><div></div>

            </Div>

            <Header>

               {this.Navegar()}

            </Header>
         </PaginaToda>
      );
   }
}

//Copie o codigo de imcorporaçao do video youtube.com para adicionar na playlist. 

export default App;
