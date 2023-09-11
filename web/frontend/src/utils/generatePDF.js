import jsPDF from "jspdf";
import "jspdf-autotable";
import { PDFDocument } from "pdf-lib";

export const generatePDF = (data) => {
    let pdfToMerge = []
    pdfToMerge.push(subdomainsPDF(data['subdomains_table'],false) )
    pdfToMerge.push(dnsRegistryPDF(data['dns_registry'], false))
    pdfToMerge.push(cloudAssetsPDF(data['cloud_assets'], false))
    pdfToMerge.push(dnsZonePDF(data['dns_zone_transfers']['zonetransfer'], false))

    //OSINT
    pdfToMerge.push(googledorksPDF(data['osint_resources'][0].data, false))
    pdfToMerge.push(gitdorksPDF(data['osint_resources'][1].data, false))
    pdfToMerge.push(softUsedPDF(data['osint_resources'][2].data, false))
    pdfToMerge.push(usersPDF(data['osint_resources'][3].data, false))
    pdfToMerge.push(metadataPDF(data['osint_resources'][4].data, false))
    pdfToMerge.push(emailsPDF(data['osint_resources'][5].data, false))
    pdfToMerge.push(osintPasswordsPDF(data['osint_resources'][6].data, false))
    pdfToMerge.push(domainsInfoPDF(data['osint_resources'][7].data, false))


    //NUCLEI
    pdfToMerge.push(nucleiInfoPDF(data['nuclei']['nuclei_outputs_info'], false))
    pdfToMerge.push(nucleiLowPDF(data['nuclei']['nuclei_outputs_low'], false))
    pdfToMerge.push(nucleiHighPDF(data['nuclei']['nuclei_outputs_high'], false))
    pdfToMerge.push(nucleiMediumPDF(data['nuclei']['nuclei_outputs_medium'], false))
    pdfToMerge.push(nucleiCriticalPDF(data['nuclei']['nuclei_outputs_critical'], false))


    //VULN
    pdfToMerge.push(brokenLinksPDF(data['vulnerabilities']['broken_links'], false))

    //DICTS
    pdfToMerge.push(paramsPDF(data['dictionaries']['params'], false))
    pdfToMerge.push(passwordsPDF(data['dictionaries']['passwords'], false))
    pdfToMerge.push(pathsPDF(data['dictionaries']['paths'], false))
    pdfToMerge.push(valuesPDF(data['dictionaries']['values'], false))
    pdfToMerge.push(wordsPDF(data['dictionaries']['words'], false))


    return mergePdfs(pdfToMerge)

}






export const mergePdfs = async (pdfsToMerges) => {
    const mergedPdf = await PDFDocument.create();
    const actions = pdfsToMerges.map(async pdfBuffer => {
    const pdf = await PDFDocument.load(pdfBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => {
      // console.log('page', page.getWidth(), page.getHeight());
      // page.setWidth(210);
      mergedPdf.addPage(page);
      });
    });
    await Promise.all(actions);
    const mergedPdfFile = await mergedPdf.save();
    const file = new Blob(
        [mergedPdfFile], 
        {type: 'application/pdf'});

        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);


    mergedPdf.save('Report.pdf')
  }













// DICTIONARIES

export const paramsPDF = (data, download=true) => {
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
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`PARAMS`);
    
}
export const passwordsPDF = (data, download=true) => {
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
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`passwords`);
}
export const pathsPDF = (data, download=true) => {
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
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`paths`);
}
export const valuesPDF = (data, download=true) => {
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
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`values`);
}
export const wordsPDF = (data, download=true) => {
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
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`words`);
}






// VULNERAABILTIES


export const vulnsPDF = (data, download=true) => {
    if(data.heading ==  'Broken Links') {
        brokenLinksPDF(data.data, download)
    }
}

const brokenLinksPDF = (data, downlaod) => {
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
    if(!downlaod) return pdf.output('arraybuffer');
    pdf.save(`Broken Links`);
}









// NUCLIE PDFS

export const nucleiInfoPDF = (data, download=true) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("l", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`Nuclei_Info`);
}
export const nucleiLowPDF = (data,download=true) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("l", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`Nuclei_Low`);
}
export const nucleiHighPDF = (data,download=true) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("l", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`Nuclei_HIGH`);
}
export const nucleiMediumPDF = (data, download=true ) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("l", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`Nuclei_medium`);
}
export const nucleiCriticalPDF = (data, download=true) => {
    // nucleiPDF(data['nuclei'])
    const nucleiColumns = ['Type','Protocol','URL','info'
    ]
    const nucleiInfoRow = data
    const pdf = new jsPDF("p", "pt", "a4");
    printTable(pdf, nucleiColumns, nucleiInfoRow, 'NUCLEI_Info')
    if(!download) return pdf.output('arraybuffer');
    pdf.save(`Nuclei_CRITICAL`);
}



// OSINT RESOUIRCES








export const googledorksPDF = (data, download=true) => {
    // const pdf = new jsPDF("p", "pt", "a4");
    // pdf.text(250, 40, `Git Dorks`);
    // pdf.text(50, 70, `${data}` , { maxWidth: 40 } );
    // pdf.save(`osintResource`);

    const pdf = new jsPDF("p", "pt", "a4");
    printString(pdf, data, 'Google Dorks')
    if(!download) return pdf.output('arraybuffer');
    pdf.save('googledorks.pdf');
}
export const gitdorksPDF = (data , download=true) => {
    // const pdf = new jsPDF("p", "pt", "a4");
    // pdf.text(250, 40, `Git Dorks`);
    // pdf.text(50, 70, `${data}` , { maxWidth: 40 } );
    // pdf.save(`osintResource`);

    const pdf = new jsPDF("p", "pt", "a4");
    printString(pdf, data, 'git Dorks')
    if(!download) return pdf.output('arraybuffer');
    pdf.save('gitdorks.pdf');
}

export const metadataPDF = (data,download=true) => {
    // const pdf = new jsPDF("p", "pt", "a4");
    // pdf.text(250, 40, `Git Dorks`);
    // pdf.text(50, 70, `${data}` , { maxWidth: 40 } );
    // pdf.save(`osintResource`);

    const pdf = new jsPDF("p", "pt", "a4");
    printString(pdf, data, 'METADATA')
    if(!download) return pdf.output('arraybuffer');
    pdf.save('metadata.pdf');
}
export const usersPDF = (data,download=true) => {
    // const pdf = new jsPDF("p", "pt", "a4");
    // pdf.text(250, 40, `Git Dorks`);
    // pdf.text(50, 70, `${data}` , { maxWidth: 40 } );
    // pdf.save(`osintResource`);

    const pdf = new jsPDF("p", "pt", "a4");
    printString(pdf, data, 'USERS')
    if(!download) return pdf.output('arraybuffer');
    pdf.save('USERS.pdf');
}
export const emailsPDF = (data,download=true) => {
    // const pdf = new jsPDF("p", "pt", "a4");
    // pdf.text(250, 40, `Git Dorks`);
    // pdf.text(50, 70, `${data}` , { maxWidth: 40 } );
    // pdf.save(`osintResource`);

    const pdf = new jsPDF("p", "pt", "a4");
    printString(pdf, data, 'EMAILS')
    if(!download) return pdf.output('arraybuffer');
    pdf.save('emails.pdf');
}

export const softUsedPDF = (data,download=true) => {
    // const pdf = new jsPDF("p", "pt", "a4");
    // pdf.text(250, 40, `Git Dorks`);
    // pdf.text(50, 70, `${data}` , { maxWidth: 40 } );
    // pdf.save(`osintResource`);

    const pdf = new jsPDF("p", "pt", "a4");
    printString(pdf, data, 'SOFTWARE')
    if(!download) return pdf.output('arraybuffer');
    pdf.save('software_used.pdf');
}
export const domainsInfoPDF = (data,download=true) => {
    // const pdf = new jsPDF("p", "pt", "a4");
    // pdf.text(250, 40, `Git Dorks`);
    // pdf.text(50, 70, `${data}` , { maxWidth: 40 } );
    // pdf.save(`osintResource`);

    const pdf = new jsPDF("p", "pt", "a4");
    printString(pdf, data, 'Domains Info')
    if(!download) return pdf.output('arraybuffer');
    pdf.save('domainsInfo.pdf');
}

export const osintPasswordsPDF = (data,download=true) => {
    // const pdf = new jsPDF("p", "pt", "a4");
    // pdf.text(250, 40, `Git Dorks`);
    // pdf.text(50, 70, `${data}` , { maxWidth: 40 } );
    // pdf.save(`osintResource`);

    const pdf = new jsPDF("p", "pt", "a4");
    printString(pdf, data, 'osint -PASSWORDS')
    if(!download) return pdf.output('arraybuffer');
    pdf.save('osintPasswords.pdf');
}






// CLOUD ASSETS

export const cloudAssetsPDF = (data,download=true) => {
    const pdf = new jsPDF("p", "pt", "a4");
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
        printTable(pdf, cloudAssetsColumns, cloudAssetsRow, 'Cloud_Assets')
        if(!download) return pdf.output('arraybuffer');
}


// SUBDOMAINS

export const dnsRegistryPDF = (data, download=true) => {
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
    if(!download) return pdf.output('arraybuffer');
    pdf.save('DNS_Registry')
}


export const subdomainsPDF = (data, download=true) => {
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
    // pdf.save('subdomains')
    if(!download) return pdf.output('arraybuffer');
    pdf.save('Subdomain.pdf')
}

export const dnsZonePDF = (data, download=true) => {
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.setFontSize(14);
    pdf.text(235,40, 'DNS_ZONE_TRANSFERS')
    pdf.text(50,70, data, { maxWidth: 400 })
    // printString(pdf, 50, 70, data, 'DNS_ZONE_TRANSFERS')
    if(!download) return pdf.output('arraybuffer');
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
    pdf.setFontSize(14);
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

const printString = (doc, data, heading) => {
    doc.setFontSize(14);
    doc.text(250, 40, `${heading}`);

    // Split the data into lines to enable word wrap
    const splitData = doc.splitTextToSize(data, 500);
    
    let y = 70; // Initial y position
    for (let i = 0; i < splitData.length; i++) {
        if (y > 750) { // Adjust this value based on your page height
            doc.addPage();
            y = 70; // Reset y position for the new page
        }
        doc.text(50, y, splitData[i]);
        y += 20; // Adjust line spacing as needed
    }

}



