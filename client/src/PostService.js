import axios from 'axios'

class PostService{
    static PostArticle(url, article) {
        return axios.post(url, { article })

    }

    static EditArticle(url, article) {
        return axios.put(url, { article })
    }

    static DeleteArticle(url) {
        return axios.delete(url)
    }

    static GetArticle(url) {
        var article = []
        axios.get(url).then(res => {
            console.log(res.data)
            article = res.data
        }).catch((error) => {
            console.log(error)
        })
        return article
    }
}


export default PostService