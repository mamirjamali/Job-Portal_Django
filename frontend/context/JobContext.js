import { useState, createContext } from 'react'
import axios from 'axios'

const JobContext = createContext();

export const JobProvider = ( { children }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [created, setCreated] = useState(false)
    const [applied, setApplied] = useState(false)
    const [stats, setStats] = useState('')
  
    //Apply To Job
    const applyToJob = async (id, access_token) => {
        try {
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/jobs/${id}/apply/`,
                {}
           , {
                headers:{
                    Authorization: `Bearer ${access_token}`
                }
            })
            if (res.data.applied) {
                setLoading(false)
                setApplied(true)
            }
            if (res.data.error) {
                setError(res.data.error)
                setLoading(false)
            }
        }
        catch (error) {
            setLoading(false)
            setError(error.response &&
                error.response.data.error || error.response.data.detail
            )
        }
    }

    //Delete Job
    const deleteJob = async (id, access_token) => {
        try {
            setLoading(true)
            const res = await axios.delete(`${process.env.API_URL}/api/jobs/${id}/delete/`,
             {
                headers:{
                    Authorization: `Bearer ${access_token}`
                }
            })
            if (res.data) {
                setLoading(false)
                setDeleted(true)
                
            }
            if (res.data.error) {
                setError(res.data.error)
                setLoading(false)
            }
        }
        catch (error) {
            setLoading(false)
            setError(error.response &&
                error.response.data.error || error.response.data.detail
            )
        }
    }

    //Create New Job
    const createJob = async (data, access_token) => {
        try {
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/jobs/new/`,
                data
           , {
                headers:{
                    Authorization: `Bearer ${access_token}`
                }
            })
            if (res.data) {
                setLoading(false)
                setCreated(true)
            }
        }
        catch (error) {
            setLoading(false)
            setError(error.response &&
                error.response.statusText || error.response.data.detail
            )
        }
    }

    //Update Job
    const updateJob = async (id, data, access_token) => {
        try {
            setLoading(true)
            const res = await axios.put(`${process.env.API_URL}/api/jobs/${id}/update/`,
                data
           , {
                headers:{
                    Authorization: `Bearer ${access_token}`
                }
            })
            if (res.data) {
                setLoading(false)
                setUpdated(true)
            }
        }
        catch (error) {
            setLoading(false)
            setError(error.response &&
                error.response.statusText || error.response.data.detail
            )
        }
    }

    //Check If Applied To Job
    const checkApplied = async (id, access_token) => {
        try {
            const res = await axios.get(`${process.env.API_URL}/api/jobs/${id}/check/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            
            setApplied(res.data)
            if (res.data.error) {
                setError(res.data.error)
                setLoading(false)
            }
        }
        catch (error) {
            setLoading(false)
            setError(error.response &&
                error.response.data.error || error.response.data.detail
            )
        }
    }


    //Get The Stats
    const getTopic = async (topic) => {
        try {
            setLoading(true)
            const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`,)
            console.log(res)
            
            setLoading(false)
            setStats(res.data)
        }
        catch (error) {
            setLoading(false)
            setError(error.response &&
                error.response.data.error || error.response.data.detail
            )
        }
    }

    //Clear Errors
    const clearErrors = () => {
        setError(null)
    }

    return (
        <JobContext.Provider
            value={{
                loading,
                error,
                updated,
                applied,
                stats,
                created,
                deleted,
                setDeleted,
                updateJob,
                deleteJob,
                setCreated,
                getTopic,
                createJob,
                checkApplied,
                applyToJob,
                setUpdated,
                clearErrors,
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext;