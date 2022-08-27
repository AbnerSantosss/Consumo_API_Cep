Passo a passo consumir a armazenar dados de API
### Levando em consideração que todo o html e css já está pronto:

1- Criar uma classe (com o construtor) para trabalhar os dados e outra (com o super) para eventos no HTML


2- Criar um script principal que vai receber o importe do outro script que contem os dados
e nesse temos qinstanciar e adicionar o seletor principal que está no html


```
import { FavoritosView } from './script.js'

new FavoritosView('#page')

```

3- Pegar o seletor principal do HTML e colocar na classe que foi chamada ex

new favorites('#app')


4- A classse "Favorites" vai receber esse seletor dentro do construto (no construtor vai ter um parametro)
ex: 
export class Favoritos {
  constructor(root) {
    

this.root = document.querySelector(root)

    

   
}

