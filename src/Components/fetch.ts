import axios from 'axios'

// const mainRoute = process.env.REACT_APP_BLINK_ENDPOINT
//   ? process.env.REACT_APP_BLINK_ENDPOINT
//   : 'https://blink.hackstrap.com/'

const mainRoute = 'https://blink.hackstrap.com/'
const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJoYWNrc3RyYXAiLCJhdWRpZW5jZSI6Imh0dHBzOi8vaGFja3N0cmFwLmNvbSIsImFsZ29yaXRobXMiOlsiSFMyNTYiXSwiY2xhaW1zIjp7Im9yZyI6ImhhY2tzdHJhcCJ9LCJpYXQiOjE2MjQ3ODkwNTd9.Dmo2eZKUtAOD7o7UPopoKRgma2jbESyYos8HKdU_tXk`

const startupId = 'startup-1slug'
// const year = 2020;
const page = 0
const page_size = 12

// export const postToCollection = (collection: string, data: object) => {
//   return axios({
//     method: "post",
//     url: `${mainRoute}v1/${collection}`,
//     headers: {
//       Authorization: token,
//     },
//     data,
//   });
// };

export const fetchCollection = (
  collection: string,
  year?: string,
  startupId?: string,
  month?: string
) => {
  return axios.get(
    `${mainRoute}v1/${collection}?page=${page}&page_size=${page_size}&startup_id=${
      startupId ? startupId : 'startup-1slug'
    }${year ? `&year=${year}` : ''}${month ? '&month=' + month : ''}`,
    {
      headers: {
        Authorization: token
      }
    }
  )
}

export const updateCollection = (
  collection: string,
  data: object[],
  startupId?: string
) => {
  return axios({
    method: 'put',
    url: `${mainRoute}v1/${collection}?startup_id=${
      startupId ? startupId : 'startup-1slug'
    }`,
    headers: {
      Authorization: token
    },
    data
  })
}

export const loginForImageBucket = () => {
  return axios({
    method: 'post',
    url: `https://api.hackstrap.com/auth/login/hackstrap`,
    data: {
      username: 'compliance@hackstrap.com',
      password: 'complianehackstrap'
    }
  })
}

export const fetchInvestorInfo = (
  collection: string,
  year?: string,
  investor_id?: string,
  month?: string
) => {
  return axios.get(
    `${mainRoute}v1/${collection}?page=${page}&page_size=${page_size}&investor_id=${
      investor_id ? investor_id : 'investor-1slug'
    }`,
    {
      headers: {
        Authorization: token
      }
    }
  )
}
