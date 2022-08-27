export class ApiCep {
  static search(usename) {
    const endpoint = `https://viacep.com.br/ws/${usename}/json/`

    return fetch(endpoint)
      .then(data => data.json())
      .then(({ cep, logradouro, complemento, bairro, localidade, uf }) => ({
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf
      }))
  }
}

//classe para gerar a lógica//
export class Favoritos {
  constructor(root) {
    this.root = document.querySelector(root)

    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@abnerDados:')) || []
  }

  delete(user) {
    const filtrarEntradas = this.entries.filter(entrada => {
      return entrada.cep !== user.cep
    })

    this.entries = filtrarEntradas
    this.update()
    this.save()
  }

  save() {
    localStorage.setItem('@abnerDados:', JSON.stringify(this.entries))
  }

  async addNaApi(usename) {
    try {
      const CepExistente = this.entries.find(entry => entry.Cep === usename)

      if (CepExistente) {
        throw new Error('Cep Já cadastrado na lista')
      }

      const user = await ApiCep.search(usename)

      if (user.cep === 400) {
        throw new Error('Cep não encontrado')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
    }
  }
}

//classe para trabalhar o HTML//
export class FavoritosView extends Favoritos {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('.table-section tbody')

    this.update()
    this.addCep()
  }

  addCep() {
    const addButton = this.root.querySelector('.nav-bar button')

    addButton.onclick = () => {
      const { value } = this.root.querySelector('.nav-bar input')

      this.addNaApi(value)
    }
  }

  update() {
    this.limpatudo()

    this.entries.forEach(user => {
      const row = this.criarLinha()

      row.querySelector('.cep').textContent = user.cep
      row.querySelector('.rua').textContent = user.logradouro
      row.querySelector('.estado').textContent = user.uf
      row.querySelector('.complemento').textContent = user.complemento
      row.querySelector('.bairro').textContent = user.bairro
      row.querySelector('.localidade').textContent = user.localidade
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm(
          'Tem Certeza que quer Remover esse Cep cadastrado?'
        )
        if (isOk) {
          this.delete(user)
        }
      }

      console.log(row)

      this.tbody.append(row)
    })
  }

  criarLinha() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="cep">50770410</td>
    <td class="rua">Rua do despacho</td>
    <td class="estado">Pernambuco</td>
    <td class="complemento">Pernambuco</td>
    <td class="bairro">Pernambuco</td>
    <td class="localidade">Pernambuco</td>
    <td class="remove"><button>X</button></td>
    `

    return tr
  }

  limpatudo() {
    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }
}
