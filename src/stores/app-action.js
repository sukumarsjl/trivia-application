import appReducer from "./app-reducer";

const shuffleArr = (arr) => {
  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
};

export default {
  getCategories: () => (dispatch) => {
    fetch(`https://opentdb.com/api_category.php`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(appReducer.actions.setCategories(data.trivia_categories));
      });
  },
  getQuestions: (data) => (dispatch) => {
    fetch(
      `https://opentdb.com/api.php?amount=${data.amount}&difficulty=${data.difficulty}&category=${data.category}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        let response = [...data.results];
        response.map((v, i) => {
          const arr = [...v.incorrect_answers];
          arr.push(v.correct_answer);
          v.options = shuffleArr(arr);
        });

        dispatch(appReducer.actions.setQuestions(response));
      });
  },
};
