import express from 'express';
const aplicativo = express();
import {carros} from './colecao-carros.js'


aplicativo.get('/carros', (req, res) => {
     let busca = req.query.busca;
     if(busca){
       let consulta = carros.filter(item => item.marca.toLowerCase().includes(busca.toLowerCase()) || 
                                            item.modelo.toLowerCase().includes(busca.toLowerCase()))
       consulta.length > 0 ? res.json(consulta): res.status(404).send({app_diz: "no results for you search"})
     } else{
        res.json(carros)

     }

     
})

aplicativo.get('/carros/:id', (req, res) => {
    let idCarro = Number(req.params.id);
    if(!isNaN(idCarro)){
      let consulta = carros.find((carro) => carro.id === idCarro)
      consulta ? res.json(consulta): res.status(404).send({app_responde: "item não encontrado"})

    }
    else{
        res.status(404).send({app_responde:'caractere inválido'})
    }
})

aplicativo.listen(3001, () => {
    console.log("aplicativo iniciado")
})