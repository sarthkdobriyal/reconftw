import { useQuery } from '@tanstack/react-query'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { Link, useLocation } from "react-router-dom";

import Subdomains from '../components/reportComponents/Subdomains';
import CloudAssets from '../components/reportComponents/CloudAssets';
import Screenshots from '../components/reportComponents/Screenshots';
import OsintResources from '../components/reportComponents/OsintResources';
import Nuclei from '../components/reportComponents/Nuclei';
import Vulnerabilities from '../components/reportComponents/Vulnerabilities';
import Javascript from '../components/reportComponents/Javascript';
import Dictionaries from '../components/reportComponents/Dictionaries';

const Report = () => {

  const { pathname } = useLocation();

  const id = pathname.split('/')[2]

  const { isLoading, isError, data } = useQuery([`scans/results/${id}`])


  if (isLoading) return <div className=' w-full text-center text-4xl flex flex-col gap-2 justify-center items-center mt-20  text-lime-400 animate-pulse duration-200'>
    <span> Please Be Patient</span>
    <span className="loading loading-dots loading-lg text-lime-400"></span></div>

  if (isError) return <div className=' w-full text-center text-4xl flex flex-col gap-4 justify-center items-center mt-20  text-red-500'>
    <span className="">Something went wrong!</span>
    <Link className='text-base-content text-lg hover:underline flex items-center gap-1' to='/'>
      <BsFillArrowLeftCircleFill size={24} color='gray' />
      Go back</Link>
  </div>

  console.log(data.vulnerabilities)

  return (
    <div className='w-full flex-col flex justify-center'>

      {
        data &&
        (<>

          {/* Subdomains */}
          <Subdomains
            data={{
              subdomainsTable: data.subdomains_table,
              donZoneTransfer: data.dns_zone_transfers?.zonetransfer,
              dnsRegistry: data.dns_registry
            }}
          />
          {/* Cloud Assets */}
          <CloudAssets
            data={data.cloud_assets}
          />

          {/* Screenshots */}
          <Screenshots />

          {/* OSINT Resources */}
          {
            data.osint_resources &&
            <OsintResources 
            data={data.osint_resources}
          />}
          {/* Nuclei */}
         {
         data.nuclei &&
         <Nuclei 
            nuclei_outputs_info={data.nuclei.nuclei_outputs_info}
            nuclei_outputs_low={data.nuclei.nuclei_outputs_low}
            nuclei_outputs_medium={data.nuclei.nuclei_outputs_medium}
            nuclei_outputs_high={data.nuclei.nuclei_outputs_high}
            nuclei_outputs_critical={data.nuclei.nuclei_outputs_critical}
          />}
          {/* Vulnerabilities */}
         {
          data.vulnerabilities && 
         <Vulnerabilities 
            cors={data.vulnerabilities.cors}
            xss={data.vulnerabilities.xss}
            broken_links={data.vulnerabilities.broken_links}
            smuggling={data.vulnerabilities.smuggling}
            crlf={data.vulnerabilities.crlf}
            open_redirect={data.vulnerabilities.open_redirect}
            command_injection={data.vulnerabilities.command_injection}
            ssrf={data.vulnerabilities.ssrf}
            ssti={data.vulnerabilities.ssti}
            lfi={data.vulnerabilities.lfi}
          />}
        {/* JAVASCRIPT */}
       {
        data.javascript && 
       <Javascript 
          live_links={data.javascript.live_links}
          url_extracts={data.javascript.url_extracts}
          endpoints={data.javascript.endpoints}
          secrets={data.javascript.secrets}
        />}

        {
          data.dictionaries &&
          <Dictionaries
            params={data.dictionaries.params}
            values={data.dictionaries.values}
            words={data.dictionaries.words}
            paths={data.dictionaries.paths}
            passwords={data.dictionaries.passwords}
          />
        }

        </>
        )

      }

    </div>
  )
}

export default Report