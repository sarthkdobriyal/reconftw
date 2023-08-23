import { useEffect, useState } from "react";
import ReportContainer from "./ReportContainer"
import { Navigate, useNavigate } from "react-router-dom";



const Screenshots = ({ data }) => {

  // const [subdomains, setSubdomains] = useState(data.map((subarr) => subarr[0]))
  // const [selectedSubdomain, setSelectedSubdomain] = useState(subdomains[0])

  // console.log(selectedSubdomain);



  // useEffect(() => {
  //   const index = subdomains.indexOf(selectedSubdomain);
  // }, [selectedSubdomain])

  return (
    <ReportContainer heading='SCREENSHOTS'>

      {/* <div className="py-5">
        <span className="font-bold tracking-wide text-lg mr-2">Subdomain:</span>
        <select className="select w-[40%] rounded-xl select-sm" onChange={(e) => setSelectedSubdomain(e.target.value)}>
          {
            subdomains.map((subdomain, i) => <option key={subdomain} className="font-semibold tracking-wide">{`${i+1} . `} {subdomain}</option>)
          }
        </select>

      </div> */}


      <div className="w-full carousel pt-5 ">
        {
          data.map((subdomain, i) => (
            <div id={`screenshot-${i}`} className="carousel-item relative w-full flex flex-col gap-3 items-center">
              <h1 className="text-2xl font-bold text-left w-[90%]">{subdomain[0]}</h1>
              <img src={`data:image/jpeg;base64,${subdomain[2]}`} className="h-[70%] object-contain" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-10 right-10 top-1/2">
                <a href={`#screenshot-${i - 1}`} className="btn btn-circle btn-ghost">❮</a>
                <a href={`#screenshot-${i + 1}`} className="btn btn-circle btn-ghost">❯</a>
              </div>
            </div>
          ))
        }
      </div>





      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </ReportContainer>
  )
}

export default Screenshots