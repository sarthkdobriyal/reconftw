import React from 'react'
import ReportContainer from './ReportContainer'
import TableComponent from '../TableComponent'
import ReportModal from './ReportModal'

const Vulnerabilities = ({cors, 
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

const corsColumns = [
    {
        header: 'S. NO.',
        accessorFn: (info, index) => index + 1,
    },
    {
        header: 'URL',
        accessorKey: 'url',
    },
    {
        header: 'Class',
        accessorKey: 'class',
    },
    {
        header: 'Description',
        accessorKey: 'description',
    },
    {
        header: 'Severity',
        accessorKey: 'severity',
    },
    {
        header: 'Exploitation',
        accessorKey: 'exploitation',
    },
    {
        header: 'ACAO Header',
        accessorKey: 'acao_header',
    },
    {
        header: 'ACAC Header',
        accessorKey: 'acac_header',
    }
]
const brokenLinksColumns = [
    {
        header: 'S. NO.',
        accessorFn: (info, index) => index + 1,
    },
    {
        header: 'Broken Links',
        accessorKey: 'broken_links',
    }
]
const smugglingColumns = [
    {
        header: 'S. NO.',
        accessorFn: (info, index) => index + 1,
    },
    {
        header: 'URL',
        accessorKey: 'url',
    },
    {
        header: 'Method',
        accessorKey: 'method',
    },
    {
        header: 'Endpoint',
        accessorKey: 'endpoint',
    },
    {
        header: 'Cookies',
        accessorKey: 'cookies',
    },
    {
        header : 'Results',
        accessorKey : 'results'
    }
]

const commandInjectionColumns = [
    
    {
        header: 'Command Injection',
        accessorKey: 'command_injection',
    }
]

const openRedirectColumns = [
    
    {
        header: 'Open Redirect',
        accessorKey: 'open_redirect',
    }
]

const ssrfColumns = [
    
    {
        header: 'Server Side Request Forgery',
        accessorKey: 'ssrf',
    }
]
const crlfColumns = [
    
    {
        header: 'Carriage Return Line Feed',
        accessorKey: 'crlf',
    }
]
const xssColumns = [
    
    {
        header: 'Cross Site Scripting',
        accessorKey: 'xss',
    }
]
const lfiColumns = [
    
    {
        header: 'Local File Inclusion',
        accessorKey: 'lfi',
    }
]
const sstiColumns = [
    
    {
        header: 'Server Side Template Injection',
        accessorKey: 'ssti',
    }
]

const vulns = [
    {
        'id': 1,
        'heading': 'CORS',
        'data':cors,
        'columns':corsColumns
    },
    {
        'id': 2,
        'heading': 'Broken Links',
        'data':broken_links,
        'columns':brokenLinksColumns
    },
    {
        'id': 3,
        'heading': 'Smuggling',
        'data':smuggling,
        'columns':smugglingColumns
    },
    {
        'id': 4,
        'heading': 'Command Injection',
        'data' : command_injection,
        'columns': commandInjectionColumns
    },
    {
        'id': 5,
        'heading': 'Open Redirect',
        'data':open_redirect,
        'columns':openRedirectColumns
    },
    {
        'id': 6,
        'heading': 'Server-Side Request Forgery',
        'data':ssrf,
        'columns':ssrfColumns
    },
    {
        'id': 7,
        'heading': 'Carriage Return Line Feed',
        'data':crlf,
        'columns':crlfColumns
    },
    {
        'id': 8,
        'heading': 'Cross Site Scripting',
        'data':xss,
        'columns':xssColumns
    },
    {
        'id': 9,
        'heading': 'Local File Inclusion',
        'data':lfi,
        'columns':lfiColumns
    },
    {
        'id': 10,
        'heading': 'Server-Side Template Injection',
        'data':ssti,
        'columns':sstiColumns
    },
]


const gfOutputs = [
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
]

  return (
    <ReportContainer heading='Vulnerabilities'>
        {/* CORS */}
        {
            vulns.map(({id, heading, data, columns}) => (
                <div key={id} className='my-6'>
                <h1 className='text-2xl font-bold tracking-wide text-base-content'>{heading}</h1>
                <TableComponent 
                    data={data}
                    columns={columns}
                />
                </div>
            ))
        }


        <div className='w-full flex flex-wrap gap-x-5 gap-y-3'>
            {
                gfOutputs.map((gfOutput) => (
                    <ReportModal 
                        key={gfOutput.id}
                        id={gfOutput.id}
                        heading={gfOutput.name}
                        data={gfOutput.data}
                    />
                ))
            }
        </div>

    </ReportContainer>
  )
}

export default Vulnerabilities