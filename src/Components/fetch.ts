import axios from "axios";

// const mainRoute = process.env.REACT_APP_BLINK_ENDPOINT
//   ? process.env.REACT_APP_BLINK_ENDPOINT
//   : 'https://blink.hackstrap.com/'

const fallbackRoute = "https://blink.hackstrap.com/";
const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJoYWNrc3RyYXAiLCJhdWRpZW5jZSI6Imh0dHBzOi8vaGFja3N0cmFwLmNvbSIsImFsZ29yaXRobXMiOlsiSFMyNTYiXSwiY2xhaW1zIjp7Im9yZyI6ImhhY2tzdHJhcCJ9LCJpYXQiOjE2MjQ3ODkwNTd9.Dmo2eZKUtAOD7o7UPopoKRgma2jbESyYos8HKdU_tXk`;

const startupId = "startup-1slug";
const page = 0;
const page_size = 12;

// If token or api route not present just pass an empty string while calling function
export const fetchCollection = (
  apiRoute: string | undefined,
  token: string | undefined,
  collection: string,
  year?: string,
  startupId?: string,
  month?: string
) => {
  return axios.get(
    `${
      apiRoute ? apiRoute : fallbackRoute
    }v1/${collection}?page=${page}&page_size=${page_size}&startup_id=${
      startupId ? startupId : ""
    }${year ? `&year=${year}` : ""}${month ? "&month=" + month : ""}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const updateCollection = (
  apiRoute: string | undefined,
  token: string | undefined,
  collection: string,
  data: object[],
  startupId?: string
) => {
  return axios({
    method: "put",
    url: `${apiRoute ? apiRoute : fallbackRoute}v1/${collection}?startup_id=${
      startupId ? startupId : ""
    }`,
    headers: {
      Authorization: token,
    },
    data,
  });
};

// export const uploadImage = () => {

// }

export const fetchInvestorInfo = (
  apiRoute: string | undefined,
  token: string | undefined,
  collection: string,
  year?: string,
  investor_id?: string,
  month?: string
) => {
  return axios.get(
    `${
      apiRoute ? apiRoute : fallbackRoute
    }v1/${collection}?page=${page}&page_size=${page_size}&investor_id=${
      investor_id ? investor_id : ""
    }`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
