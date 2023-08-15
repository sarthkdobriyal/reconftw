
import { useMemo } from 'react';
import TableComponent from '../TableComponent'
import ReportContainer from './ReportContainer'

const Javascript = ({ live_links, url_extracts, endpoints }) => {
    const liveLinksColumns = useMemo(
        () => [
            {
                header: 'S.No',
                accessorFn: (info, index) => index + 1,
            },
            {
                header: 'Live Links',
                accessorFn: (info) => info,
            },
        ],
        []
    );

    const urlExtractsColumns = useMemo(
        () => [
            {
                header: 'S.No',
                accessorFn: (info, index) => index + 1,
            },
            {
                header: 'Url Extracts',
                accessorFn: (info) => info,
            },
        ],
        []
    );

    const endpointsColumns = useMemo(
        () => [
            {
                header: 'S.No',
                accessorFn: (info, index) => index + 1,
            },
            {
                header: 'Endpoints',
                accessorFn: (info) => info,
            },
        ],
        []
    );

    return (
        <ReportContainer heading='Javascript'>
            <TableComponent
                data={live_links}
                columns={liveLinksColumns}
            />
            <TableComponent
                data={url_extracts}
                columns={urlExtractsColumns}
            />
            <TableComponent
                data={endpoints}
                columns={endpointsColumns}
            />
        </ReportContainer>
    )
}

export default Javascript