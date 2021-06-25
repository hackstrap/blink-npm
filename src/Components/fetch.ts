import axios from "axios";

export const postToCollection = (collection: string, data: object) => {
  return axios({
    method: "post",
    url: `http://localhost:8080/v1/${collection}`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmciOiJ0eWtlIn0.jcdo696pGncsl_MMl92uC9JODHX_kN-qi7EZ_t3VVjw",
    },
    data,
  });
};

export const fetchCollection = (collection: string) => {
  return axios.get(`http://localhost:8080/v1/${collection}?pageSize=12`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmciOiJ0eWtlIn0.jcdo696pGncsl_MMl92uC9JODHX_kN-qi7EZ_t3VVjw",
    },
  });
};
