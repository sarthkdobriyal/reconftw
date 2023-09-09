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
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import createUrl from '../utils/createUrl'
import axios from 'axios';

const Report = () => {

  const { pathname } = useLocation();
  const { user, authToken } = useContext(AuthContext);

  const id = pathname.split('/')[2]

  const reportUrl = createUrl('', `/scans/results/${id}`)
  const { isLoading, isError, data } = useQuery(['report'], () => axios.get(`${reportUrl}`, {
    headers: {
      'Authorization': `Bearer ${authToken.access}`,
      'x-request-id': user.tenant.tenant_uuid
  },
}))


  if (isLoading) return <div className=' w-full text-center text-4xl flex flex-col gap-2 justify-center items-center mt-20  text-sky-400 animate-pulse duration-200'>
    <span> Please Be Patient</span>
    <span className="loading loading-dots loading-lg text-sky-400"></span></div>

  if (isError) return <div className=' w-full text-center text-4xl flex flex-col gap-4 justify-center items-center mt-20  text-red-500'>
    <span className="">Something went wrong!</span>
    <Link className='text-base-content text-lg hover:underline flex items-center gap-1' to='/'>
      <BsFillArrowLeftCircleFill size={24} color='gray' />
      Go back</Link>
  </div>

  console.log(data)
  return (
    <div className='w-full flex-col flex justify-center'>

      {
        data &&
        (<>

          {/* Subdomains */}
          <Subdomains
            data={{
              subdomainsTable: data.data.subdomains_table,
              donZoneTransfer: data.data.dns_zone_transfers?.zonetransfer,
              dnsRegistry: data.data.dns_registry
            }}
          />
          {/* Cloud Assets */}
          <CloudAssets
            data={data.data.cloud_assets}
          />

          {/* Screenshots */}
          <Screenshots 
            data={data.data.screenshots}
          />

          {/* OSINT Resources */}
          {
            data.data.osint_resources &&
            <OsintResources 
            data={data.data.osint_resources}
          />}
          {/* Nuclei */}
         {
         data.data.nuclei &&
         <Nuclei 
            nuclei_outputs_info={data.data.nuclei.nuclei_outputs_info}
            nuclei_outputs_low={data.data.nuclei.nuclei_outputs_low}
            nuclei_outputs_medium={data.data.nuclei.nuclei_outputs_medium}
            nuclei_outputs_high={data.data.nuclei.nuclei_outputs_high}
            nuclei_outputs_critical={data.data.nuclei.nuclei_outputs_critical}
          />}
          {/* Vulnerabilities */}
         {
          data.data.vulnerabilities && 
         <Vulnerabilities 
            cors={data.data.vulnerabilities.cors}
            xss={data.data.vulnerabilities.xss}
            broken_links={data.data.vulnerabilities.broken_links}
            smuggling={data.data.vulnerabilities.smuggling}
            crlf={data.data.vulnerabilities.crlf}
            open_redirect={data.data.vulnerabilities.open_redirect}
            command_injection={data.data.vulnerabilities.command_injection}
            ssrf={data.data.vulnerabilities.ssrf}
            ssti={data.data.vulnerabilities.ssti}
            lfi={data.data.vulnerabilities.lfi}
          />}
        {/* JAVASCRIPT */}
       {
        data.data.javascript && 
       <Javascript 
          live_links={data.data.javascript.live_links}
          url_extracts={data.data.javascript.url_extracts}
          endpoints={data.data.javascript.endpoints}
          secrets={data.data.javascript.secrets}
        />}

        {
          data.data.dictionaries &&
          <Dictionaries
            params={data.data.dictionaries.params}
            values={data.data.dictionaries.values}
            words={data.data.dictionaries.words}
            paths={data.data.dictionaries.paths}
            passwords={data.data.dictionaries.passwords}
          />
        }

        </>
        )

      }

    </div>
  )
}

export default Report