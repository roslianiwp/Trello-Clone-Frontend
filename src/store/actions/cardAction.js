import axios from "axios";
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export const getCards = (listId) => {
  return async (dispatch) => {
    await axios
      .get(baseUrl + "/card/list", 
      {
        params: { listId: listId },
      })
      .then(async (response) => {
        dispatch({ type: "SUCCESS_GET_CARDS", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const createCard = (listId, text) => {
  return async (dispatch) => {
    const bodyRequest = {
      listId: listId,
      text: text,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .post(baseUrl + "/card", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: "SUCCESS_CREATE_CARD" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const reorderCard = (id, listId, order) => {
  return async (dispatch) => {
    const bodyRequest = {
      id: id,
      listId : listId,
      order: order,
    };
    const myJSON = JSON.stringify(bodyRequest);
    console.warn("myJSON Body Req", myJSON);
    const token = localStorage.getItem("token");
    await axios
      .put(baseUrl + "/card", myJSON, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch({ type: "SUCCESS_REORDER_CARD" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCard = (listId, text) => {
    return {
      type: "SUCCESS_ADD_CARD",
      payload: { listId, text },
    };
  };

  export const editCard = (id, listId, newText) => {
    return {
      type: "SUCCESS_EDIT_CARD",
      payload: { id, listId, newText }
    };
  };
  
  export const deleteCard = (id, listId) => {
    return {
      type: "SUCCESS_DELETE_CARD",
      payload: { id, listId }
    };
  };

  export const stopLoading = () => {
    return {
      type: "STOP_LOADING",
    };
  };