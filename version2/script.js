const app = new Vue({
    el: '#app',
    data: function(){
        return{
            musicAlbum: [],
            genres: [],
            albumData: [],
        }
    },

    methods:{
        getMusicAlbums(elementToFilter){
            axios.get('http://localhost/php-ajax-dischi/version2/db.php')
            .then((result) => {
                this.musicAlbum = result.data.response;
                console.log(this.musicAlbum);

                // Recupero i dati sul genere dalla variabile musicAlbum, popolata dalla chiamati API
                for (let i=0; i < this.musicAlbum.length ; i++){
                    // Inserisco i dati in un array denominato genres
                    this.genres.push(result.data.response[i].genre);
                }
                console.log(this.genres);

                // Rimuovo i duplicati dell'array
                this.genres = [... new Set(this.genres)];
                console.log(this.genres);

                // Creato un array di oggetti con i dati dei generi
                this.albumData = [
                    {
                        data: "genres", 
                        content: this.genres,
                    }
                ];
                console.log(this.albumData);

                // Condizione sull'argomento per filtrare i risultati
                // L'argomento passato sarà il valore del v-model 'selectedElement' nel figlio, ovvero l'opzione scelta nella select
                if (elementToFilter == "") {
                        this.musicAlbum = response.data.response;
                    } else {
                        const filteredElement = this.musicAlbum.filter((album) => album.genre.toLowerCase() == elementToFilter.toLowerCase());
                        this.musicAlbum = filteredElement;
                    }
            })
            
            .catch((error) => {
                console.warn(error);
            })
        }
    },

    created(){
        this.getMusicAlbums();
    }
})