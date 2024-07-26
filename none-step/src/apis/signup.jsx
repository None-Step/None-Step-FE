import axios from "axios";

export const signup = async (memberID, memberPass, memberName, memberMail, memberPhone) => {
  const result = await axios.post('http://localhost:5173', {
    memberID,
    memberPass,
    memberName,
    memberMail, 
    memberPhone
  });
  return result.data;
};