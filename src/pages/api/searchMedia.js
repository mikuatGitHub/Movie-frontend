import axios from "axios";

export default async(req, res) => {
    const { searchQuery } = req.query;
    // console.log(req.query)

    if (!searchQuery) {
        return res.status(400).json({ message: '検索文字がありません' });
    }

    try {
        const response= await axios.get(`
https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&language=ja-JP`)

    return res.status(200).json(response.data);
    // console.log(response.data.results)

    } catch (err) {
        // フロント側にはerr内容を返さない
        console.log(err);
        return res.status(500).json({ message: 'サーバー側でエラー発生' });
    }
}
