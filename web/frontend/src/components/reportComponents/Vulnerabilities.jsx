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

        console.log(cors)

const corsArray = []; 

Object.keys(cors).map((key) => corsArray.push({
    'url' : key,
     'class' : cors[key]['class'],
     'description': cors[key]['description'],
     'severity': cors[key]['severity'],
     'exploitation': cors[key]['exploitation'],
     'acao header': cors[key]['acao header'],
     'acac header': cors[key]['acac header'], 
}))

const corsColumns = [
    {
        header: 'S. NO.',
        accessorFn: (info, index) => index + 1,
    },
    {
        header: 'url',
        accessorKey : 'url'
    },    
    
    {
        header: 'Description',
        accessorKey : 'description'
    },
    {
        header: 'Severity',
        accessorKey : 'severity'
    },
    {
        header: 'Exploitation',
        accessorKey : 'exploitation',
    },
    {
        header: 'ACAO Header',
        accessorKey : 'acao header',
    },
    {
        header: 'ACAC Header',
        accessorKey : 'acac header',
    }

]
const brokenLinksColumns = [
    {
        header: 'S. NO.',
        accessorFn: (info, index) => index + 1,
    },
    {
        header: 'Broken Links',
        accessorFn: info => info,
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
        'id': 4,  // Corrected ID for Open Redirect
        'heading': 'Open Redirect',
        'data': open_redirect,
        'columns': openRedirectColumns
    },
    {
        'id': 5,  // Corrected ID for Server-Side Request Forgery
        'heading': 'Server-Side Request Forgery',
        'data': ssrf,
        'columns': ssrfColumns
    },
    {
        'id': 6,  // Corrected ID for Carriage Return Line Feed
        'heading': 'Carriage Return Line Feed',
        'data': crlf,
        'columns': crlfColumns
    },
    {
        'id': 7,  // Corrected ID for Cross Site Scripting
        'heading': 'Cross Site Scripting',
        'data': xss,
        'columns': xssColumns
    },
    {
        'id': 8,  // Corrected ID for Local File Inclusion
        'heading': 'Local File Inclusion',
        'data': lfi,
        'columns': lfiColumns
    },
    {
        'id': 9,  // Corrected ID for Server-Side Template Injection
        'heading': 'Server-Side Template Injection',
        'data': ssti,
        'columns': sstiColumns
    },
];



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
    {
        'id': 'smuggling',
        'name': 'Smuggling',
        'data': smuggling
    },
]




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
                        modalClassName={gfOutput.id === 'smuggling' ? 'w-[60%] max-w-[60%]': '' }
                    />
                })
            }
        </div>

    </ReportContainer>
  )
}

export default Vulnerabilities