/**
 * Cachear API
 *
 * Como usar:
 * const cachedApi = new CachedApi(Abstração de uma biblioteca API);
 * Ex.:
 * const cachedApi = new CachedApi(axiosApi);
 *
 *
 * cachedApi.post(url, params)
 * cachedApi.get(url, params)
 * Ex.:
 * cachedApi.post(`/contrato/contrato/agrupamento`, {codigoAgrupadores})
 *
 * todo:
 * - Colocar configuração de tempo de cache
 * - Guardar em storage
 * - Otimizar
 *
 * */
import api from './api';

export default class CachedApi {

  constructor(url) {
    this._cachedUrls = [];
    this._api = api(url);
  }

  post(...args) {
    return this._request(args, 'post');
  }

  get(...args) {
    return this._request(args, 'get');
  }

  _addCachedUrl(url, params, data) {
    const hash             = this._strToHashCode(`${ url }${ JSON.stringify(params) }`);
    this._cachedUrls[hash] = data;
  }

  _getCachedUrl(url, params) {
    const hash = this._strToHashCode(`${ url }${ JSON.stringify(params) }`);
    return this._cachedUrls[hash];
  }

  _request(args, callType) {
    const url    = args[0];
    const params = args[1];

    const getCached = this._getCachedUrl(url, params);

    if (getCached) {
      return Promise.resolve(getCached);
    }
    return this._api[callType](...args).then(response => {
      this._addCachedUrl(url, params, response);
      return response;
    }).catch(error => {
      return error;
    });
  }

  _strToHashCode(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash &= hash; // Convert to 32bit integer
    }
    return hash;
  }
}
