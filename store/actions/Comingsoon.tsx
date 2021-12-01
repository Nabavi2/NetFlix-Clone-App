export const FETCH_COMINGSOONS = "FETCH_COMINGSOONS";
export const UPDATE_SELECTED_COMINGSOON = "UPATE_SELECTED_COMINGSOON";
export const fetchComingSoons = () => {
  return async (dispatch: any) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM3ODIxNDcxLCJleHAiOjE2NDA0MTM0NzF9.EeYZ52w2Q2UYc0njevC3Q3aIwwWLsApSvaHPeTmwp4g";
    const response = await fetch(
      "https://netflix-test-app.herokuapp.com/coming-soons",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Could not fetch coming soons!");
    }
    const resData = await response.json();
    console.log("resssssss", resData);

    dispatch({
      type: FETCH_COMINGSOONS,
      comingSoonList: resData,
    });
  };
};

export const updateSelectedComingSoon = (comingSoon: any) => {
  return async (dispatch: any) => {
    dispatch({ type: UPDATE_SELECTED_COMINGSOON, comingSoon });
  };
};
