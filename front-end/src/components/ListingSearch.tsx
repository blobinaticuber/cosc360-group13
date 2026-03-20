import './ListingSearch.css'

type ListingSearchProps = {
    query: string;
    onQueryChange: (value: string) => void;
}

export function ListingSearch({query, onQueryChange}) {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <input
            placeholder="Search for title or description"
            type="text"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            />
        </form>
    )
}
