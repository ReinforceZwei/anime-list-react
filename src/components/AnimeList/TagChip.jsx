import { useGetTagQuery } from "../../redux/tagSlice"


const TagChipProps = {
    tagId: ''
}

export default function TagChip(props = TagChipProps) {
    const { tagId } = props
    const { data, isLoading } = useGetTagQuery(tagId)

    if (isLoading) {
        return null
    }
    return (
        <span>{data.name}</span>
    )
}