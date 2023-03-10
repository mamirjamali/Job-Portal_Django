import React from "react";
import JobItem from "./job/JobItem";
import Filters from "./layouts/filters";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";


const Home = ({data}) => {

  const { count, jobs, perPage } = data;
  const router = useRouter();

  let { page = 1, keyword } = router.query;
  page = Number(page)

  let queryParams;
  if (typeof window != "undefined") {
    queryParams = new URLSearchParams(window.location.search)
  }

  const handlePageChange = (currentPage) => {
      if (queryParams.has("page")) {
        queryParams.set("page", currentPage)
      } else {
        queryParams.append("page", currentPage)
      }

      router.push({
        search: queryParams.toString()
      })
  }
  
  return (
    <>
      <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <Filters />
          </div>

          <div className="col-xl-9 col-lg-8 content-left-offset">
            <div className="my-5">
              <h4 className="page-title">
                {
                  keyword ? `${jobs.length} Results for ${keyword}` : "Latest Jobs"
                }
              </h4>
              <Link href="/stats">
                <button className="btn btn-secondary float-right stats_btn">
                  Get Topic stats
                </button>
              </Link>
              <div className="d-block">
                <Link href="/search">Go to Search</Link>
              </div>
            </div>
            {
              jobs && jobs.map(job => <JobItem key={ job.id} job={ job } />)
            }
            {
              count > perPage && 
              <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={page}
                itemsCountPerPage={perPage}
                totalItemsCount={count}
                onChange={handlePageChange}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                lastPageText={"Last"}
                firstPageText={"first"}
                itemClass="page-item"
                linkClass="page-link"
                />
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;