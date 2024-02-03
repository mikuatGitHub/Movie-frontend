import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';


const Home = () => {
    // state管理
    const [movies, setMovies] = useState([]);

    //リロードでTMDB_APIを呼び出し
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('api/getPopularMovies');
                // console.log(response.data.results);

                // state初期値moviesに取得データを格納
                setMovies(response.data.results);
                // console.log(movies);

            } catch (err) {
                console.log(err);
            }
        }
        fetchMovies();
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Movie/TV Search App
                </h2>
            }>

            <Head>
                <title>Home</title>
            </Head>

            <SearchBar/>

            {/* swiper・MUIでスタイリング */}
            <Swiper
                navigation
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                }}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={swiper => console.log(swiper)}
            >
            {movies.map(movie => (
                <SwiperSlide key={movie.id}>
                <Link href={`detail/movie/${movie.id}`}>
                <CardMedia
                    component={"img"}
                    sx={{
                        aspectRatio: '2/3',
                        // filter: 'blur(8px)'
                    }}
                    image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    />
                {/* <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                /> */}

                <Typography>
                    公開日：{movie.release_date}
                </Typography>
            </Link>
            </SwiperSlide>
            ))}
            </Swiper>

        </AppLayout>
    )
}

export default Home
