import AppLayout from '@/components/Layouts/AppLayout';
import Layout from '@/components/Layouts/Layout';
import MediaCard from '@/components/MediaCard';
import Sidebar from '@/components/Sidebar';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const search = () => {
    // add2 Sidebarで選択したカテゴリを格納
    const [category, setCategory] = useState('all');
    // console.log(category)

    // add1 検索対象フィルター結果を格納
    const [results, setResults] = useState([]);

    // フロントからqueryを受け取る
    const router = useRouter();
    // const searchQuery = router.query.query;
    const { query: searchQuery } = router.query;
    // console.log(searchQuery)

    // add4 loading状態を判別
    const [loading, setLoading] = useState(true);

    // searchQueryを更新した時、apiサーバとreq/res通信実行
    useEffect(() => {
        // searchQuery=undifinedの時は処理しない
        if (!searchQuery) {return}
        const fetchMedia = async () => {
            try {
                const response = await axios.get(`api/searchMedia?searchQuery=${searchQuery}`)
                // console.log(response)

                // add1 検索対象のフィルター機能
                const searchResults = response.data.results;
                const validResults= searchResults.filter(
                    item => item.media_type == 'movie' || item.media_type == 'tv'
                )
                setResults(validResults);
                // console.log(searchResults)
                // console.log(validResults)
                // console.log(results)

             } catch (err) {
                console.log(err);

            } finally {
                setLoading(false);
            }
        }
        fetchMedia();
    }, [searchQuery])

    // add3 検索フィルター結果resultsステートを、categoryステートと合致するデータだけreturn
    const filterdResults= results.filter((result) => {
        if (category == 'all') {
            return true;
        }
        return result.media_type === category;
    })
    // console.log(filterdResults);

return (
    <AppLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Search
            </h2>
        }>
        <Head>
            <title>Laravel - Search</title>
        </Head>

        {/* add2 Sidebarで選択したカテゴリだけ表示する */}
        <Layout sidebar={<Sidebar setCategory={setCategory} />}>
            {loading ? (
                <Grid item textAlign={"center"} xs={12}>
                    {/* add4 loading状態の場合にメッセージを返す*/}
                    <Typography>検索中</Typography>
                </Grid>
            ) :

            filterdResults.length > 0 ? (
                <Grid container spacing={3}>
                {filterdResults.map((media) => (
                    <MediaCard item={media} key={media.id} />
                    ))}
                </Grid>
            ) : (
                <Grid item textAlign={"center"} xs={12}>
                    {/* add3 filterResults配列が空の場合にメッセージを返す */}
                    <Typography>検索結果が見つかりませんでした</Typography>
                </Grid>
                )

            }
        </Layout>

    </AppLayout>
)
}

export default search
