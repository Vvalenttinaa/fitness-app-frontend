import Filter from "../model/filter.model";

export const constants = {
    CURRENT_TOKEN: 'CURRENT_TOKEN',
  };

const apiurl = 'http://localhost:8080/api';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiurl}/auth/login`,
    register: `${apiurl}/auth/register`
  },
  ProgramEndpoint:{
    getAll: `${apiurl}/program`,
    getAllSearch: `${apiurl}/program/search`,
    getById: `${apiurl}/program/:id`,
    getAllComments: `${apiurl}program/:id/comments`,
    getAllReplies: `${apiurl}/program/comments/:id/reply`,
    postComment: `${apiurl}/program`,
    postReply: `${apiurl}/program/comments/:id/reply`
  },
  NewsEndpoint:{
    getAll: `${apiurl}/news`,
  },
  UserEndpoint:{
    startProgram: `${apiurl}/user`,
    getAllMyPrograms: `${apiurl}/user/:id/programs`,
    deleteProgram: `${apiurl}/user/:userId/program/:programId`,
    getById: `${apiurl}/program/:id`,
    getAll: `${apiurl}/user`,
    sendMessage: `${apiurl}/user`,
    getMessages: `${apiurl}/user/:id/messages`,
  },
  CategoryEndpoint:{
    getAll: `${apiurl}/category`,
    getAllAttributesByCategory: (categoryId: number) => `${apiurl}/category/${categoryId}`,
    getAllAttributes: `${apiurl}/category/attributes`,
    getAllAttributeDescriptions: `${apiurl}/category/attributeDescriptions`,
  }
};