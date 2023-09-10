
import ReportContainer from './ReportContainer'
import TableComponent from '../TableComponent'
import ReportModal from './ReportModal'
import { useMemo } from 'react';
import PDFDownload from './PDFDownload';
import { vulnsPDF } from '../../utils/generatePDF';

const Vulnerabilities = ({ cors,
    broken_links,
    smuggling,
    crlf,
    open_redirect,
    command_injection,
    ssrf,
    ssti,
    xss,
    lfi
}) => {


    const corsArray = useMemo(() => (
        Object.keys(cors).map((key) => ({
            'url': key,
            'class': cors[key]['class'],
            'description': cors[key]['description'],
            'severity': cors[key]['severity'],
            'exploitation': cors[key]['exploitation'],
            'acao header': cors[key]['acao header'],
            'acac header': cors[key]['acac header'],
        }))
    ), [cors]);

    const corsColumns = useMemo(() => [
        {
            header: 'S. NO.',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'url',
            accessorKey: 'url'
        },

        {
            header: 'Description',
            accessorKey: 'description'
        },
        {
            header: 'Severity',
            accessorKey: 'severity'
        },
        {
            header: 'Exploitation',
            accessorKey: 'exploitation',
        },
        {
            header: 'ACAO Header',
            accessorKey: 'acao header',
        },
        {
            header: 'ACAC Header',
            accessorKey: 'acac header',
        }

    ], [])
    const brokenLinksColumns = useMemo(() => [
        {
            header: 'S. NO.',
            accessorFn: (info, index) => index + 1,
        },
        {
            header: 'Broken Links',
            accessorFn: info => info,
        }
    ], []);

    const commandInjectionColumns = useMemo(() => [
        {
            header: 'Command Injection',
            accessorKey: 'command_injection',
        }
    ], []);

    const openRedirectColumns = useMemo(() => [
        {
            header: 'Open Redirect',
            accessorKey: 'open_redirect',
        }
    ], []);

    const ssrfColumns = useMemo(() => [
        {
            header: 'Server Side Request Forgery',
            accessorKey: 'ssrf',
        }
    ], []);

    const crlfColumns = useMemo(() => [
        {
            header: 'Carriage Return Line Feed',
            accessorKey: 'crlf',
        }
    ], []);

    const xssColumns = useMemo(() => [
        {
            header: 'Cross Site Scripting',
            accessorKey: 'xss',
        }
    ], []);

    const lfiColumns = useMemo(() => [
        {
            header: 'Local File Inclusion',
            accessorKey: 'lfi',
        }
    ], []);

    const sstiColumns = useMemo(() => [
        {
            header: 'Server Side Template Injection',
            accessorKey: 'ssti',
        }
    ], []);

    const vulns = useMemo(() => [
        {
            'id': 1,
            'heading': 'CORS',
            'data': corsArray,
            'columns': corsColumns
        },
        {
            'id': 2,
            'heading': 'Broken Links',
            'data': broken_links,
            'columns': brokenLinksColumns
        },
        {
            'id': 3,
            'heading': 'Command Injection',
            'data': command_injection,
            'columns': commandInjectionColumns
        },
        {
            'id': 4,
            'heading': 'Open Redirect',
            'data': open_redirect,
            'columns': openRedirectColumns
        },
        {
            'id': 5,
            'heading': 'Server-Side Request Forgery',
            'data': ssrf,
            'columns': ssrfColumns
        },
        {
            'id': 6,
            'heading': 'Carriage Return Line Feed',
            'data': crlf,
            'columns': crlfColumns
        },
        {
            'id': 7,
            'heading': 'Cross Site Scripting',
            'data': xss,
            'columns': xssColumns
        },
        {
            'id': 8,
            'heading': 'Local File Inclusion',
            'data': lfi,
            'columns': lfiColumns
        },
        {
            'id': 9,
            'heading': 'Server-Side Template Injection',
            'data': ssti,
            'columns': sstiColumns
        },
    ], [corsArray, broken_links, command_injection, open_redirect, ssrf, crlf, xss, lfi, ssti,
        sstiColumns, lfiColumns, xssColumns, crlfColumns, ssrfColumns, openRedirectColumns, commandInjectionColumns, brokenLinksColumns, corsColumns
    ]);



    const gfOutputs = useMemo(() => [
        {
            'id': 'endpoints',
            'name': 'Endpoints',
            'data': ''
        },
        {
            'id': 'lfi',
            'name': 'Local File Inclusion',
            'data': ''
        },
        {
            'id': 'code_execution',
            'name': 'Code Execution',
            'data': ''
        },
        {
            'id': 'open_redirect',
            'name': 'Open Redirect',
            'data': ''
        },
        {
            'id': 'sqli',
            'name': 'SQL Injection',
            'data': ''
        },
        {
            'id': 'ssrf',
            'name': 'Server-Side Request Forgery',
            'data': ''
        },
        {
            'id': 'ssti',
            'name': 'Server-Side Template Injection',
            'data': ''
        },
        {
            'id': 'xss',
            'name': 'Cross Site Scripting',
            'data': ''
        },
        {
            'id': 'potential',
            'name': 'Potential',
            'data': ''
        },
        {
            'id': 'smuggling',
            'name': 'Smuggling',
            'data': smuggling
        },
    ], [smuggling]);





    return (
        <ReportContainer heading='Vulnerabilities'>
            {/* CORS */}
            {
                vulns.map((vuln) => (
                    <div key={vuln.id} className='my-6'>
                        <h1 className='text-2xl font-bold tracking-wide text-base-content'>{vuln.heading}</h1>
                        <TableComponent
                            data={vuln.data}
                            columns={vuln.columns}
                        />  
                        <div className='my-1 w-full flex justify-end'>
                        <PDFDownload handleDownload={() => vulnsPDF(vuln)} />
                    </div>
                    </div>
                ))
            }


            <div className='w-full flex flex-wrap gap-x-5 gap-y-3'>
                {
                    gfOutputs.map((gfOutput) => {
                        return <ReportModal
                            key={gfOutput.id}
                            id={gfOutput.id}
                            heading={gfOutput.name}
                            data={gfOutput.data}
                            modalClassName={gfOutput.id === 'smuggling' ? 'w-[60%] max-w-[60%]' : ''}
                        />
                    })
                }
            </div>

        </ReportContainer>
    )
}

export default Vulnerabilities