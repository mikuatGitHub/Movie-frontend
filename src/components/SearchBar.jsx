import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router';

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        // console.log("textfield-change")
        // console.log(e.target.value);

        // queryに初期値をセット
        setQuery(e.target.value);
    }

    const searchQuery = (e) => {
        // alert("test")

        // リロードするとstateが更新されてしまう
        e.preventDefault();

        // 不適切な検索を除外するためtrim（空白削除しtrue/false判定）を使用
        if (!query.trim()) {
            return
        }
        // 入力された文字を文字列としてrouterへ渡す
        router.push(`search?query=${encodeURIComponent(query)}`)
    }

  return (
    <Box component={"form"} onSubmit={searchQuery}
          sx={{
              width: "80%",
              margin: '3% auto',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
    }}>

    <TextField onChange={handleChange} fullWidth variant='filled' placeholder='検索する' sx={{ mr: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />

    <Button type='submit'><SearchIcon /></Button>

    </Box>
  )
}

export default SearchBar
