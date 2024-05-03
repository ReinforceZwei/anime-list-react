import { useTheme } from '@mui/material'
import { styled } from '@mui/system'
import TagChip from './TagChip'
import { useGetTagOrderQuery } from '../../redux/tagSlice'
import { sortSubArray } from '../../vendors/sortHelper'
import { useMemo } from 'react'

const AnimeListItemProps = {
    name: '',
    status: '',
    downloadStatus: '',
    tags: [],
}



export default function AnimeListItem(props = AnimeListItemProps) {
    const { name, status, downloadStatus, tags } = props
    const theme = useTheme()
    const { data: tagOrder } = useGetTagOrderQuery()

    let color = theme.palette.text.primary
    if (downloadStatus == 'finished') {
        color = theme.downloadStatus.finished
    } else if (status == 'finished') {
        color = theme.status.finished
    } else if (status == 'abandon') {
        color = theme.status.abandon
    }

    const sortedTag = useMemo(() => (tagOrder && tags ? sortSubArray(tagOrder, tags) : []), [tags, tagOrder])

    const style = {
        color: color
    }
    return (
        <li>
            <span style={style}>{name}</span>
            { sortedTag && sortedTag.map(tagId => (
                <TagChip tagId={tagId} />
            ))}
        </li>
    )
}