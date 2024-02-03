import AppLayout from '@/components/Layouts/AppLayout'
import { Box, Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import Head from 'next/head'
import React from 'react'

// SSR front側
const Detail = ({ detail,media_type,media_id }) => {
    // console.log(detail);

return (
// header
<AppLayout
header={
    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Selected Detail
    </h2>
}>
<Head>
    <title>Detail</title>
</Head>

{/* main */}
<Box
    sx={{
        // bgcolor: 'red',
        height: {xs: 'auto', md: '90vh'},
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    }}
>
    <Box
        sx={{
            // bgcolor: 'blue',
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})`,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',

            //背景画像Boxのぼかし
            '&::before': {
                // bgcolor: 'yellow',
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
            },
        }}
    />

    <Container sx={{ zIndex: 1 }}>
        <Grid sx={{color:'white'}} container alignItems={'center'}>

            <Grid item md={4} sx={{ display: 'flex', justifyContent: 'center'}}>
                <img width='70%' src={`https://image.tmdb.org/t/p/original/${detail.poster_path}`} />
            </Grid>

            <Grid item md={8}>
                <Typography variant='h4' paragraph>{detail.title || detail.name}</Typography>

                <Typography paragraph>{detail.overview}</Typography>

                <Typography variant='h6'>
                    {media_type == "movie" ?
                    `公開日：${detail.release_date}` : `初回放送日：${detail.first_air_date}`}
                </Typography>
            </Grid>

        </Grid>
    </Container>
</Box>

</AppLayout>
)/* return */
}

// SSR server側
// 取得先apiエンドポイントの指定（https://developer.themoviedb.org/reference/movie-details）
export async function getServerSideProps(context) {
    const { media_type, media_id } = context.params

    try {
        const jpResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`);

        // 日本語あらすじoverviewが無い場合は英語で取得
        let combinedData= {...jpResponse.data}/* copy */
        if (!jpResponse.data.overview) {
            const enResponse = await axios.get(
                `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            )
            combinedData.overview= enResponse.data.overview
        }

        // const fetchData = response.data;
        const fetchData = combinedData;
        return {
            props: { detail: fetchData, media_type, media_id },
        }

    } catch (err) {
        console.error(err)
        return {
            props: { notfound: true },
        }
    }
}

export default Detail
