import axios from 'axios'

// axios 配置
// axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '';
// axios.defaults.baseURL = 'http://result.eolinker.com/fkUv9Yld1ffee1c91f2f414afdcd8a682398ea00ddfa17c?uri=';
const baseurl = 'http://192.168.20.218:8069';
const baseMock  = 'http://result.eolinker.com/uQzuQVB77a50e4760b14d6d156869ec90fc88596a298171?uri=';
// axios.defaults.withCredentials = true;
//

let instance = axios.create({
    headers: {'tokenid': sessionStorage.getItem('tokenid')}
});

let instanceMock = axios.create({

});
//



//后台数据联调
export function Get(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(baseurl + url, params)
            .then(response => {
                if (response.data.code == '1') {
                    resolve(response.data);
                }
                else if(response.data.code=='501') {
                    instanceMock.get(baseMock + url, params)
                        .then(response => {
                            resolve(response.data);
                        })
                        .catch((error) => {
                            reject(error)
                        })
                }

            })
            .catch((error) => {
                instanceMock.get(baseMock + url, params)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
    })
}
//前端mock数据联调
/*export function Get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(baseMock+url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    })
}*/

//前端mock数据联调
/*export function Get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}*/


export default {
  /**
   * 获取首页地图数据
   */
  getMapData () {
    return Get('/zombie/indexPage/getMapData')
  },
  /**
   * 获取列表页筛选条件数据-行业
   */
  getConditionData1 (params) {
    return Get('/zombie/latestSuspected/getScreenConditionsIndustryData',{params})
  },
  /**
   * 获取列表页筛选条件数据-省份
   */
  getConditionData2 (params) {
    return Get('/zombie/latestSuspected/getScreenConditionsProviceData',{params})
  },
  /**
   * 获取最新疑似僵尸企业列表页数据
   */
  getListData1 (params) {
    return Get('/zombie/latestSuspected/getListData',{params})
  },
  /**
   * 获取高风险疑似僵尸企业列表页数据
   */
  getListData2 (params) {
    return Get('/zombie/highriskSuspected/getListData',{params})
  },
  /**
   * 获取高风险疑似僵尸企业-附近疑似僵尸企业数据
   */
  getNearIndustryData (params) {
    return Get('/zombie/latestSuspected/getNearIndustryData',{params})
  },
  /**
   * 获取高风险疑似僵尸企业-最新疑似僵尸企业数据
   */
  getNewIndustryData1 (params) {
    return Get('/zombie/latestSuspected/getNewIndustryData',{params})
  },
  /**
   * 僵尸企业统计分析页-疑似僵尸企业数量走势
   */
  getNewIndustryData () {
      return Get('/zombie/analysis/getNumMove')
  },
  /**
   * 僵尸企业统计分析页-僵尸企业所属行业分析
   */
  getIndustryAnalysis () {
      return Get('/zombie/analysis/getIndustryAnalysis')
  },
  /**
   * 僵尸企业统计分析页-僵尸企业数量(地图)
   */
  getMapData1 () {
      return Get('/zombie/analysis/getMapData')
  },
  /**
   * 僵尸企业统计分析页-僵尸企业注册时间分析
   */
  getRegisterData () {
      return Get('/zombie/analysis/getRegisterData')
  },
  /**
   * 僵尸企业统计分析页-僵尸企业类型分析
   */
  getTypeAnalysis () {
      return Get('/zombie/analysis/getTypeAnalysis')
  },
  /**
   * 僵尸企业统计分析页-僵尸企业成因分析
   */
  getRensonAnalysis () {
      return Get('/zombie/analysis/getRensonAnalysis')
  },
  /**
   * 僵尸企业统计分析页-企业风险等级分布
   */
  getLevelDistribute () {
      return Get('/zombie/analysis/getLevelDistribute')
  },
  /**
   * 僵尸企业统计分析页-区域僵尸企业数量TOP10
   */
  getRankTop () {
      return Get('/zombie/analysis/getRankTop')
  },
  /**
   * 僵尸企业详情页-僵尸企业雷达图
   */
  getRaderData (params) {
    return Get('/zombie/details/getRaderData',{params})
  },
  /**
   * 僵尸企业详情页-扫描企业详情
   */
  getCompanyData (params) {
    return Get('/zombie/details/getCompanyData',{params})
  },
    /**
     * 僵尸企业详情页-扫描企业详情
     */
   getBranchData(params){
        return Get('/zombie/details/getBranchData',{params})
   },
  /**
   * 僵尸企业-关注企业
   */
  getAttention (params) {
      return Get('/zombie/getAttention',{params})
  },
  /**
   * 僵尸企业-取消关注企业
   */
  getUnfollow (params) {
      return Get('/zombie/getUnfollow',{params})
  }
}
