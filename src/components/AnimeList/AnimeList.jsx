import { useGetAnimesWithOptionQuery } from "../../redux/animeSlice"


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
            { title && <h2>{title}</h2> }
            { isLoading ? (<div>Loading</div>) : (
                <ol>
                {data.map((anime) => (
                    <li key={anime.id}>{anime.name}</li>
                ))}
                </ol>
            )}
        </div>
    )
}