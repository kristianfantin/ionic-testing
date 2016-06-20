angular.module('starter.services')
  .service('cervejaAction', cervejaAction);

function cervejaAction(cervejaDao, cervejaStore) {

  this.buscarCervejas = function (sort) {
    sort = sort || 'name';

    cervejaDao.all()
      .then(function (cervejas) {
        cervejaStore.setState({
          sort: sort,
          listaCervejas: _.sortBy(cervejas, sort)
        });
      });
  };

  this.criar = function (dados, cb) {
    
    if (!dados || !dados.name || dados.name.length < 3) {
      return cb('Informa nome da cerveja com mais de 3 letras');
    }

    dados.name = dados.name.toUpperCase();

    cervejaDao.save(dados);
    cervejaStore.setState({cervejaAtual: dados});
    this.buscarCervejas(cervejaStore.getState().sort);
    cb();
  }

  this.remove = function (cerveja, cb) {

    if (!cerveja)
      return cb('Não tem cerveja para remover');

    cervejaDao.remove(cerveja);
    this.buscarCervejas(cervejaStore.getState().sort);
    cb();
  }

}