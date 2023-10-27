import ApiServices from "./ApiServices";

export const fetchArticleService = payload =>{
  return ApiServices.get("http://localhost:4000/api/articles")
};
