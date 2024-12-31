import axios from "axios";

const API = "https://otruyenapi.com";

export const getHome = async () => {
  try {
    const response = await axios.get(`${API}/v1/api/home`);
    if (response.status === 200) {
      console.log("Fetched data successfully");
      return response.data.data.items;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getBySlug = async (slug) => {
    try {
      const response = await axios.get(`${API}/v1/api/truyen-tranh/${slug}`);
      if (response.status === 200) {
        console.log("Fetched data successfully");
        return response.data.data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  export const getChapterData = async (slug) => {
    try {
      const response = await axios.get(`${API}/v1/api/truyen-tranh/${slug}`);
      const chapters = response.data.data.item.chapters;
      console.log("Chapters:", chapters);
      return chapters;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  export const getChapterDetails = async (chapterApiData) => {
    try {
      console.log("Fetching chapter details from:", chapterApiData);
      const response = await axios.get(chapterApiData);
      const chapterDetails = response.data.data;
      console.log("Chapter Details:", chapterDetails);
      return chapterDetails;
    } catch (error) {
      console.error("Error fetching chapter details:", error.message);
      throw new Error(error.message);
    }
  };
  