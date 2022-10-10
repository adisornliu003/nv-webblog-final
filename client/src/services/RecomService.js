import Api from '@/services/Api'

export default {
    index() {
        return Api().get('recoms')
    },
    show(recomId){
        return Api().get('recom/'+recomId)
    },
    post(recom){
        return Api().post('recom', recom)
    },
    put(recom){
        return Api().put('recom/'+recom.id, recom)
    },
    delete(recom){
        return Api().delete('recom/'+recom.id, recom)
    },
}