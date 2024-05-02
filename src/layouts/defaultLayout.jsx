import AnimeList from "../components/AnimeList/AnimeList";



export default function DefaultLayout() {

    return (
        <>
        <h1>Anime List</h1>
        <AnimeList title="Watched" filter="status = 'finished'" sort="+created" />
        <AnimeList title="To Watch" filter="status = 'pending'" sort="+created" />
        </>
    )
}