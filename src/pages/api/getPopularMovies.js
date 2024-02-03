import axios from "axios"

export default async function handler(req, res) {
    try {
        const response = await axios(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`
        )
        res.status(200).json(response.data);
        // console.log(response.data)

    } catch (err) {
        // フロント側にはerr内容を返さない
        console.log(err)
        res.status(500).json({message: 'サーバー側でエラー発生'});
    }
}
