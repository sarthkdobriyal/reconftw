import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (data) => {
    Object.keys(data).map(reportHeading => {
        console.log(reportHeading)
    })
    // printString(data['dns_zone_transfers'].zonetransfer, 'DNS_ZONE_TRANSFERS')
    // dnsRegistryPDF(data['dns_registry'])
    passwordsPDF(data['dictionaries'].passwords)

}


// DICTIONARIES

export const paramsPDF = (data) => {
    const pdf = new jsPDF("p", "pt", "a4");

    const paramsColumn = ['params']

    const paramsRow = []
    data.map(param => {
        const paramsData = [
            param
        ]
        paramsRow.push(paramsData)
    })
    
    printTable(pdf, paramsColumn, paramsRow, 'PARAMS')
    pdf.save(`PARAMS`);
}
export const passwordsPDF = (data) => {
    const pdf = new jsPDF("p", "pt", "a4");

    const passwordsColumn = ['passwords']

    const passwordsRow = []
    data.map(password => {
        const passwordsData = [
                password
        ]
        passwordsRow.push(passwordsData)
    })
    
    printTable(pdf, passwordsColumn, passwordsRow, 'passwords')
    pdf.save(`passwords`);
}
export const pathsPDF = (data) => {
    const pdf = new jsPDF("p", "pt", "a4");

    const pathsColumn = ['paths']

    const pathsRow = []
    data.map(password => {
        const pathsData = [
                password
        ]
        pathsRow.push(pathsData)
    })
    
    printTable(pdf, pathsColumn, pathsRow, 'paths')
    pdf.save(`paths`);
}
export const valuesPDF = (data) => {
    const pdf = new jsPDF("p", "pt", "a4");

    const valuesColumn = ['values']

    const valuesRow = []
    data.map(password => {
        const valuesData = [
                password
        ]
        valuesRow.push(valuesData)
    })
    
    printTable(pdf, valuesColumn, valuesRow, 'values')
    pdf.save(`values`);
}
export const wordsPDF = (data) => {
    const pdf = new jsPDF("p", "pt", "a4");

    const wordsColumn = ['words']

    const wordsRow = []
    data.map(password => {
        const wordsData = [
                password
        ]
        wordsRow.push(wordsData)
    })
    
    printTable(pdf, wordsColumn, wordsRow, 'words')
    pdf.save(`words`);
}






// VULNERAABILTIES


export const vulnsPDF = (data) => {
    if(data.heading ==  'Broken Links') {
        brokenLinksPDF(data.data)
    }
}

const brokenLinksPDF = (data) => {
    // nucleiPDF(data['nuclei'])

    const pdf = new jsPDF("p", "pt", "a4");

    const brokenLinksColumn = ['brokenlinks']

    const brokenLinksRow = []
    data.map(brokenLink => {
        const brokenLinksData = [
            brokenLink
        ]
        brokenLinksRow.push(brokenLinksData)
    })
    
    printTable(pdf, brokenLinksColumn, brokenLinksRow, 'Broken Links')
    pdf.save(`Broken Links`);
}









// NUCLIE PDFS

export const nucleiInfoPDF = (data) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("l", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    pdf.save(`Nuclei_Info`);
}
export const nucleiLowPDF = (data) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("l", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    pdf.save(`Nuclei_Low`);
}
export const nucleiHighPDF = (data) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("l", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    pdf.save(`Nuclei_HIGH`);
}
export const nucleiMediumPDF = (data) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("l", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    pdf.save(`Nuclei_medium`);
}
export const nucleiCriticalPDF = (data) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("p", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    pdf.save(`Nuclei_CRITICAL`);
}



// OSINT RESOUIRCES

export const osintResouircePDF = (data) => {
    const pdf = new jsPDF("p", "pt", "a4");
    data.map((osintResource, i) => {
        printString(pdf,50,70+i*200, osintResource.data, `${osintResource.title}` )
    })
    pdf.save(`osintResource`);
}


// CLOUD ASSETS

export const cloudAssetsPDF = (data) => {
    const cloudAssetsColumns = [
          'protected_s3bucket','google','azure','storage_account',
        ]
        let cloudAssetsRow = []
        data.map(cloudAsset => {
            const cloudAssetsInfo = [
                cloudAsset.protected_s3bucket,
                cloudAsset.google,
                cloudAsset.azure,
                cloudAsset.storage_account,
            ]
            cloudAssetsRow.push(cloudAssetsInfo)
        })
        printTable(cloudAssetsColumns, cloudAssetsRow, 'Cloud_Assets')
}


// SUBDOMAINS

export const dnsRegistryPDF = (data) => {
    const pdf = new jsPDF("l", "pt", "a4");
    let dnsRegistryColumns = [
        'host',
        'resolver',
        'cname',
        'a_record',
        'aaaa_record',
        'mx_record',
        'soa_record',
        'ns_record',
        'internal_ips_record',
    ]
    let dnsRegistryRow = []
    data.map(dnsRegistry => {
        const dnsRegistryInfo = [
            dnsRegistry.host,
            dnsRegistry.resolver,
            dnsRegistry.cname,
            dnsRegistry.a_record,
            dnsRegistry.aaaa_record,
            dnsRegistry.mx_record,
            dnsRegistry.soa_record,
            dnsRegistry.ns_record,
            dnsRegistry.internal_ips_record,
        ]
        dnsRegistryRow.push(dnsRegistryInfo)
    })
    printTable(pdf, dnsRegistryColumns, dnsRegistryRow, 'DNS_Registry')
    pdf.save('DNS_Registry')
}


export const subdomainsPDF = (data) => {
    const pdf = new jsPDF("l", "pt", "a4");
    const subdomainsColumns = [
        'Subdomains', 'IP Address', 'Ports', 'Subtakeover',
    ]

    let subdomainsRow = []

    data.map(subdomain => {
        const subdomainInfo = [
            subdomain.subdomain,
            subdomain.ip_address,
            subdomain.ports,
            subdomain.subtakeover,
        ]
        subdomainsRow.push(subdomainInfo)
    })
    printTable(pdf, subdomainsColumns, subdomainsRow, 'Subdomains table')
    pdf.save('subdomains')
}

export const dnsZonePDF = (data) => {
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.text(235,40, 'DNS_ZONE_TRANSFERS')
    printString(pdf, 50, 70, data, 'DNS_ZONE_TRANSFERS')
    pdf.save('DNS_ZONE_TRANSFERS')
}



const printTable = (pdf, columns, rows, heading, ) => {
    // const pdf = new jsPDF("p", "pt", "a4");

    // var rows = [];

    // for (let i = 0; i < json.length; i++) {
    //     /*for (var key in json[i]) {
    //       var temp = [key, json[i][key]];
    //       rows.push(temp);
    //     }*/
    //     var temp = [
    //         json[i].id,
    //         json[i].start.split("T")[0],
    //         json[i].duration,
    //         json[i].name,
    //         json[i].project,
    //         json[i].task,
    //         json[i].comment
    //     ];
    //     rows.push(temp);
    // }
    pdf.text(235, 40, `${heading}`);
    pdf.autoTable(columns, rows, {
        startY: 65,
        theme: "grid",
        styles: {
            font: "times",
            halign: "center",
            cellPadding: 3.5,
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            textColor: [0, 0, 0]
        },
        headStyles: {
            textColor: [0, 0, 0],
            fontStyle: "normal",
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            fillColor: [166, 204, 247]
        },
        alternateRowStyles: {
            fillColor: [212, 212, 212],
            textColor: [0, 0, 0],
            lineWidth: 0.5,
            lineColor: [0, 0, 0]
        },
        rowStyles: {
            lineWidth: 0.5,
            lineColor: [0, 0, 0]
        },
        tableLineColor: [0, 0, 0]
    });
    console.log(pdf.output("datauristring"));
    // pdf.save(`${heading}`);
};

const printString = (pdf,x,y, string) => {
    pdf.text(x, y, `${string}`);

}



