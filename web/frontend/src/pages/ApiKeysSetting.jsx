

const ApiKeysSetting = () => {
  return (
    <div className='px-10 w-full '>
      <h1 className='text-3xl my-5 font-bold tracking-wide'>API Keys</h1>

      {/* ReconFTW Config */}
      <div className='w-full bg-base-200 py-5 rounded-xl flex  flex-col items-center border-8 border-gray-700'>
        <h1 className='text-2xl font-bold text-sky-600 tracking-widest text-center mt-5 mb-5'>ReconFTW Config </h1>
        <div className='w-full  px-20 flex flex-wrap justify-around gap-y-4 py-10 '>
          {/* SHODAN */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">SHODAN</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* WHOISXML */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">WHOISXML</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* XSS SERVER */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">XSS SERVER</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* COLLAB SERVER */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">COLLAB SERVER</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* SLACK CHANNEL */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">SLACK CHANNEL</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* SLACK AUTH */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">SLACK AUTH</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
        </div>
        <button className='btn btn-wide bg-base-100 rounded-xl text-xl font-bold shadow-inner shadow-gray-400'>Submit</button>
        </div>


        {/* AMASS Tool */}
        <div className='w-full bg-base-200 py-5 rounded-xl flex  flex-col items-center border-8 border-gray-700'>
        <h1 className='text-2xl font-bold text-sky-600 tracking-widest text-center mt-5 mb-5'>AMASS TOOL</h1>
        <div className='w-full  flex flex-wrap justify-around gap-y-4 py-10 '>
          {/* PASSIVEDNS */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">PASSIVEDNS</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* INTELX */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">INTELX</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* ASNLOOKUP */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">ASNLOOKUP</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* IPDATA */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">IPDATA</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* AHREFS */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">AHREFS</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* IPINFO */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">IPINFO</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* ALIENVAULT */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">ALIENVAULT</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* LEAKIX */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">LEAKIX</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* BEVIGIL */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">BEVIGIL</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* NETLAS */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">NETLAS</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* BIGDATACLOUD */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">BIGDATACLOUD</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* NETWORKSDB */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">NETWORKSDB</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* BUFFEROVER */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">BUFFEROVER</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* ONYPHE */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">IPINFO</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* BUILTWITH */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">BUILTWITH</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* PSBDMP */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">PSBDMP</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* C99 */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">C99</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* RIKIQ API KEY */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">RIKIQ API KEY</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* RIKIQ USERNAME */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">RIKIQ USERNAME</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* CENSYS API KEY */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">CENSYS API KEY</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          
          {/* CENSYS SECRET */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">CENSYS SECRET</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* PENTEST TOOLS */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">PENTEST TOOLS</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* CHAOS */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">CHAOS</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* QUAKE360 */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">QUAKE360</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* CIRCL USERNAME */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">CIRCL USERNAME</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* CIRCL PASSWORD */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">CIRCL PASSWORD</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* SOCRADAR */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">SOCRADAR</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* SECURITYTRAILS */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">SECURITYTRAILS</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* CLOUDFLARE */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">CLOUDFLARE</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* SHODAN */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">SHODAN</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* DIGICERT APIKEY */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">DIGICERT APIKEY</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* DIGICERT USERNAME */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">DIGICERT USERNAME</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* SPAMHAUS USERNAME */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">SPAMHAUS USERNAME</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* SPAMHAUS PASSWORD */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">SPAMHAUS PASSWORD</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* DNSDB */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">DNSDB</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* DNSLYTICS */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">DNSLYTICS</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* DNSREPO */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">DNSREPO</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* SPYSE */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">SPYSE</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* THREATBOOK */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">THREATBOOK</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* TWITTER APIKEY */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">TWITTER APIKEY</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* TWITTER SECRET */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">TWITTER SECRET</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* DEEPINFO */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">DEEPINFO</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* DETECTIFY */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">DETECTIFY</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* FACEBOOK APIKEY */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">FACEBOOK APIKEY</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* FACEBOOK SECRET */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">FACEBOOK SECRET</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* CISCO */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">CISCO</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* URLSCAN */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">URLSCAN</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* VIRUSTOTAL */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">VIRUSTOTAL</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* FOFA APIKEY */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">FOFA APIKEY</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* FOFA USERNAME */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">FOFA USERNAME</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* WHOISXMLAPI */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">WHOISXMLAPI</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* ZETALYTICS */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">ZETALYTICS</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* FULLHUNT */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">FULLHUNT</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* GITHUB */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">GITHUB</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* HACKERTARGET */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">HACKERTARGET</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* ZOOMEYE USERNAME */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">ZOOMEYE USERNAME</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* ZOOMEYE PASSWORD */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">ZOOMEYE PASSWORD</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* HUNTER */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">HUNTER</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* YANDEX APIKEY */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">YANDEX APIKEY</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* YANDEX USERNAME */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">YANDEX USERNAME</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
         
        </div>
        <button className='btn btn-wide bg-base-100 rounded-xl text-xl font-bold shadow-inner shadow-gray-400'>Submit</button>
        </div>

        {/* GITHUB TOKENS */}
        <div className='w-full bg-base-200 py-5 rounded-xl flex  flex-col items-center border-8 border-gray-700'>
        <h1 className='text-2xl font-bold text-sky-600 tracking-widest text-center mt-5 mb-5'>GITHUB TOKENS</h1>
        <div className='w-full  px-20 flex flex-wrap justify-around gap-y-4 py-10 '>
          {/* TOKEN 1 */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">TOKEN 1</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* TOKEN 2 */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">TOKEN 2</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* TOKEN 3 */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">TOKEN 3</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* TOKEN 4 */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">TOKEN 4</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* TOKEN 5 */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">TOKEN 5</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
          {/* TOKEN 6 */}
          <div className="form-control w-full max-w-xs ">
            <label className="label">
              <span className="label-text font-bold text tracking-wide">TOKEN 6</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded-md" />
          </div>
        </div>
        <button className='btn btn-wide bg-base-200 rounded-xl text-xl font-bold shadow-inner shadow-gray-400'>Submit</button>
        </div>










        </div>
  )
}

export default ApiKeysSetting