import { Typography } from "@mui/material"
import { useGetAnimesWithOptionQuery } from "../../redux/animeSlice"
import AnimeListItem from "./AnimeListItem"


const AnimeListProps = {
    title: '',
    filter: '',
    sort: '',
}

export default function AnimeList(props = AnimeListProps) {
    const { title, filter, sort } = props
    
    const { data, isLoading } = useGetAnimesWithOptionQuery({
        'sort': sort,
        'filter': filter,
    })


    return (
        <div>
            { title && <Typography variant="subtitle1" align="center">{title}</Typography> }
            { isLoading ? (<div>Loading</div>) : (
                <ol>
                {data.map((anime) => (
                    <AnimeListItem key={anime.id} name={anime.name} status={anime.status} downloadStatus={anime.download_status} tags={anime.tags} />
                ))}
                </ol>
            )}
        </div>
    )
}