class Storage {
    get = (key) =>{
        let datas = []
        if (localStorage.getItem(key) === null || localStorage.getItem(key).length === 0){
            return datas
        }
        datas = JSON.parse(localStorage.getItem(key))
        return datas['records']
    }

    add = (key,value) => {
        let datas = {'records':[]}
        if (localStorage.getItem(key) !== null && localStorage.getItem(key).length > 0){
            datas = JSON.parse(localStorage.getItem(key))
        }
        datas['records'].push(value)
        localStorage.setItem(key,JSON.stringify(datas))
    }

    delete = (key,value) => {
        let datas = {}
        if (localStorage.getItem(key) !== null && localStorage.getItem(key).length > 0){
            datas = JSON.parse(localStorage.getItem(key))
        }
        let data = datas['records']
        let res = {'records':[]}
        let temp = data.filter((item,index)=>{
            if (item.Date === value.Date && item.Title === value.Title && item.Amount === value.Amount){
                return null
            } else {
                return item
            }
        })
        res['records'] = temp
        localStorage.setItem(key,JSON.stringify(res))
    }

    update =(key,oldValue,newValue) =>{
        this.delete(key,oldValue)
        this.add(key,newValue)
    }

    clear = (key) =>{
        localStorage.removeItem(key)
    }
}
let storage = new Storage()
export default storage
