angular.module('starter.services')
  .service('notaAction', notaAction);

function notaAction($q, notaDao, notaStore, cervejaDao) {

  this.buscarNotas = function (sort) {
    sort = sort || 'status';

    notaDao.all()
      .then(function (notas) {

        var promessas = notas.map(function (nota) {
          return cervejaDao.get(nota.cervejaId)
            .then(function (cerveja) {
              nota.cerveja = cerveja;
              delete nota.cervejaId;
              return nota;
            });
        });

        $q.all(promessas)
          .then(function (notas) {
            notaStore.setState({
              sort: sort,
              listaNotas: _.sortBy(notas, sort)
            });
          });

      })
  };

  this.criar = function (dados, cb) {
    dados.local = dados.local.toUpperCase();

    notaDao.save(dados);
    notaStore.setState({notaAtual: dados});
    this.buscarNotas(notaStore.getState().sort);
    cb();
  }

  this.remove = function (nota, cb) {

    if (!nota)
      return cb('Não tem nota para remover');

    notaDao.remove(nota);
    this.buscarNotas(notaStore.getState().sort);
    cb();
  }

  this.abreConsumo = function (nota) {
    nota.status = "EM CONSUMO";
    this.criar(nota, function () { });
  }

  this.fechaConsumo = function (nota) {
    nota.status = "FECHADO";
    this.criar(nota, function () { });
  }

  this.addQuantidade = function (nota) {
    nota.quantidade++;
    this.criar(nota, function () { });
  }

  this.lessQuantidade = function (nota) {
    if (nota.quantidade > 0) {
      nota.quantidade--;
      this.criar(nota, function () { });
    }
  }
}